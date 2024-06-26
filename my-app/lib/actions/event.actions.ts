'use server';

import {
    CreateEventParams, UpdateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByStyleParams,
} from "@/types";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Style from "../database/models/style.model";

const getStyleByName = async (name: string) => {
    return Style.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateEvent = async (query: any) => {
    return query
        .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
        .populate({ path: 'style', model: Style, select: '_id name' })
}

//CREATE

export const createEvent = async ({ event, userId, path }: CreateEventParams) => {
    try {

        await connectToDatabase();

        const organizer = await User.findById(userId)

        if (!organizer) {
            throw new Error('Organizer not found')
        }

        const newEvent = await Event.create({
            ...event,
            style: event.styleId,
            organizer: userId
        })

        revalidatePath(path)

        return JSON.parse(JSON.stringify(newEvent))

    } catch (error) {
        handleError(error)
    }
}

//GET ONE EVENT BY ID

export async function getEventById(eventId: string) {
    try {
        await connectToDatabase()

        const event = await populateEvent(Event.findById(eventId))

        if (!event) throw new Error('Event not found')

        return JSON.parse(JSON.stringify(event))
    } catch (error) {
        handleError(error)
    }
}

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
    try {
        await connectToDatabase()

        const eventToUpdate = await Event.findById(event._id)
        if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
            throw new Error('Unauthorized or event not found')
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            event._id,
            { ...event, style: event.styleId },
            { new: true }
        )
        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
        handleError(error)
    }
}

//GET ALL EVENTS
export async function getAllEvents({ query, limit = 6, page, style }: GetAllEventsParams) {
    try {
        await connectToDatabase()

        const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
        const styleCondition = style ? await getStyleByName(style) : null
        const conditions = {
            $and: [titleCondition, styleCondition ? { style: styleCondition._id } : {}],
        }

        const skipAmount = (Number(page) - 1) * limit

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit);

        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions)

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit)
        }
    } catch (error) {
        handleError(error)
    }
}

//DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
    try {
        await connectToDatabase()

        const deletedEvent = await Event.findByIdAndDelete(eventId)

        if (deletedEvent) revalidatePath(path);

    } catch (error) {
        handleError(error)
    }
}

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
    try {
        await connectToDatabase()

        const conditions = { organizer: userId }
        const skipAmount = (page - 1) * limit

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)

        const events = await populateEvent(eventsQuery)
        const eventsCount = await Event.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
        handleError(error)
    }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByStyle({
    styleId,
    eventId,
    limit = 3,
    page = 1,
}: GetRelatedEventsByStyleParams) {
    try {
        await connectToDatabase()

        const skipAmount = (Number(page) - 1) * limit
        const conditions = { $and: [{ style: styleId }, { _id: { $ne: eventId } }] }

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)

        const events = await populateEvent(eventsQuery)
        const eventsCount = await Event.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
        handleError(error)
    }
}