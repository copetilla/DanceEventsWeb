// 'use client'

// import React, { useState } from 'react'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"

// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { EventFormSchema } from '@/lib/validator'
// import * as z from 'zod'
// import { eventDefaultValues } from '@/constants'
// import Dropdown from './Dropdown'
// import { Textarea } from '../ui/textarea'
// import { FileUploader } from './FileUploader'
// import Image from 'next/image'
// import { DatePickerWithRange } from './DatePicker'
// import { Checkbox } from '../ui/checkbox'

// //calendar-------------------

// import { addDays, format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"
// import { DateRange } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { Calendar } from "@/components/ui/calendar"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"

// //---------------------------

// type EventFormProps = {
//     userId: string
//     type: 'Create' | 'Update'
// }

// const EventForm = ({ userId, type }: EventFormProps) => {

//     const [files, setFiles] = useState<File[]>([])
//     const [date, setDate] = React.useState<DateRange | undefined>(undefined);


//     const disabledDays = { before: new Date() };

//     const initialValues = eventDefaultValues;

//     // 1. Define your form.
//     const form = useForm<z.infer<typeof EventFormSchema>>({
//         resolver: zodResolver(EventFormSchema),
//         defaultValues: initialValues
//     })

//     // 2. Define a submit handler.
//     function onSubmit(values: z.infer<typeof EventFormSchema>) {
//         // Do something with the form values.
//         // ✅ This will be type-safe and validated.
//         console.log(values)
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

//                 <div className='flex flex-col gap-5 md:flex-row'>

//                     <FormField
//                         control={form.control}
//                         name="title"
//                         render={({ field }) => (
//                             <FormItem className='w-full'>
//                                 <FormControl>
//                                     <Input placeholder="Event Title" {...field} className='input-field' />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="categoryId"
//                         render={({ field }) => (
//                             <FormItem className='w-full'>
//                                 <FormControl>
//                                     <Dropdown onChangeHandler={field.onChange} value={field.value} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className='flex flex-col gap-5 md:flex-row'>

//                     <FormField
//                         control={form.control}
//                         name="description"
//                         render={({ field }) => (
//                             <FormItem className='w-full'>
//                                 <FormControl className='h-72'>
//                                     <Textarea placeholder='Description' {...field} className='textarea rounded-2xl' />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="imageUrl"
//                         render={({ field }) => (
//                             <FormItem className='w-full'>
//                                 <FormControl className='h-48'>
//                                     <FileUploader
//                                         onFieldChange={field.onChange}
//                                         imageUrl={field.value}
//                                         setFiles={setFiles}
//                                     />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                 </div>

//                 <div className='flex flex-col gap-5 md:flex-row'>
//                     <FormField
//                         control={form.control}
//                         name="location"
//                         render={({ field }) => (
//                             <FormItem className='w-full'>
//                                 <FormControl>
//                                     <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
//                                         <Image
//                                             src='/assets/icons/location-grey.svg'
//                                             alt='location'
//                                             width={24}
//                                             height={24}
//                                         />
//                                         <Input placeholder="Location" {...field} className='input-field' />
//                                     </div>

//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="categoryId"
//                         render={({ field }) => (
//                             <FormItem className='w-full'>
//                                 <FormControl>
//                                     <Dropdown onChangeHandler={field.onChange} value={field.value} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                 </div>

//                 <div className='flex flex-col gap-5 md:flex-row'>
//                     <div className='w-full md:w-1/2'>
//                         <FormField
//                             control={form.control}
//                             name="startDateTime"
//                             render={({ field }) => (
//                                 <FormItem className='w-full'>
//                                     <FormControl>

//                                         <div className={cn("grid gap-2",)}>
//                                             <Popover>
//                                                 <PopoverTrigger asChild>
//                                                     <Button
//                                                         id="date"
//                                                         variant={"outline"}
//                                                         className={cn(
//                                                             "flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2",
//                                                             !date && "text-muted-foreground"
//                                                         )}
//                                                     >
//                                                         <CalendarIcon className="mr-2 h-4 w-4" />
//                                                         {date?.from ? (
//                                                             date.to ? (
//                                                                 <>
//                                                                     {format(date.from, "LLL dd, y")} -{" "}
//                                                                     {format(date.to, "LLL dd, y")}
//                                                                 </>
//                                                             ) : (
//                                                                 format(date.from, "LLL dd, y")
//                                                             )
//                                                         ) : (
//                                                             <span>Pick a date</span>
//                                                         )}
//                                                     </Button>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent className="w-auto p-0" align="start">
//                                                     <Calendar
//                                                         initialFocus
//                                                         mode="range"
//                                                         defaultMonth={date?.from}
//                                                         selected={date}
//                                                         onSelect={setDate}
//                                                         numberOfMonths={2}
//                                                         disabled={disabledDays}
//                                                     />
//                                                 </PopoverContent>
//                                             </Popover>
//                                         </div>

//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     {/* <div className='flex flex-col gap-5 w-full md:w-1/2 md:flex-row'>
//                         <FormField
//                             control={form.control}
//                             name="startTime"
//                             render={({ field }) => (
//                                 <FormItem className='w-full'>
//                                     <FormControl>
//                                         <Input type='time' className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2' />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="endTime"
//                             render={({ field }) => (
//                                 <FormItem className='w-full'>
//                                     <FormControl>

//                                         <Input
//                                             id="endTime"
//                                             type='time'
//                                             placeholder='End Time'
//                                             className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'

//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div> */}
//                 </div>


//                 <div className='flex flex-col gap-5 md:flex-row'>
//                     <FormField
//                         control={form.control}
//                         name="price"
//                         render={({ field }) => (
//                             <FormItem className="w-full">
//                                 <FormControl>
//                                     <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
//                                         <Image
//                                             src="/assets/icons/dollar.svg"
//                                             alt="dollar"
//                                             width={24}
//                                             height={24}
//                                             className="filter-grey"
//                                         />
//                                         <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
//                                         <FormField
//                                             control={form.control}
//                                             name="isFree"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormControl>
//                                                         <div className="flex items-center">
//                                                             <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
//                                                             <Checkbox
//                                                                 onCheckedChange={field.onChange}
//                                                                 checked={field.value}
//                                                                 id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
//                                                         </div>

//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>

//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="url"
//                         render={({ field }) => (
//                             <FormItem className='w-full'>
//                                 <FormControl>
//                                     <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
//                                         <Image
//                                             src='/assets/icons/link.svg'
//                                             alt='link'
//                                             width={24}
//                                             height={24}
//                                         />
//                                         <Input placeholder="URL" {...field} className='input-field' />
//                                     </div>

//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>

//                 <Button
//                     type="submit"
//                     size='lg'
//                     disabled={form.formState.isSubmitting}
//                     className='button col-span-2 w-full '>
//                     {form.formState.isSubmitting ? ('Submitting...') : `${type} Event`}
//                 </Button>
//             </form>
//         </Form >
//     )
// }

// export default EventForm


"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useUploadThing } from '@/lib/uploadthing'

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { TypeEvent } from "@/lib/database/models/event.model"


type EventFormProps = {
    userId: string
    type: "Create" | "Update"
    event?: TypeEvent,
    eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const initialValues = event && type === 'Update'
        ? {
            ...event,
            startDateTime: new Date(event.startDateTime),
            endDateTime: new Date(event.endDateTime)
        }
        : eventDefaultValues;

    const router = useRouter();

    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof EventFormSchema>>({
        resolver: zodResolver(EventFormSchema),
        defaultValues: initialValues
    })

    async function onSubmit(values: z.infer<typeof EventFormSchema>) {

        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if (!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
            console.log(uploadedImageUrl)
        }

        if (type === 'Create') {
            try {

                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                })

                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent._id}`)
                }

            } catch (error) {
                console.log(error)
            }
        }

        if (type === 'Update') {
            if (!eventId) {
                router.back()
                return;
            }

            try {
                const updatedEvent = await updateEvent({
                    userId,
                    event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
                    path: `/events/${eventId}`
                })

                if (updatedEvent) {
                    form.reset();
                    router.push(`/events/${updatedEvent._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Event title" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="styleId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/location-grey.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                        />

                                        <Input placeholder="Event location or Online" {...field} className="input-field" />
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                            minDate={new Date()}
                                        />
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                            minDate={new Date()}
                                        />
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/dollar.svg"
                                            alt="dollar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                        <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center">
                                                            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                                            <Checkbox
                                                                onCheckedChange={field.onChange}
                                                                checked={field.value}
                                                                id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                                                        </div>

                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/link.svg"
                                            alt="link"
                                            width={24}
                                            height={24}
                                        />

                                        <Input placeholder="URL" {...field} className="input-field" />
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-row justify-center pt-10">

                    <Button
                        type="submit"
                        size="lg"
                        disabled={form.formState.isSubmitting}
                        className="button col-span-2 w-full md:w-2/5"
                    >
                        {form.formState.isSubmitting ? (
                            'Submitting...'
                        ) : `${type} Event `}</Button>
                </div>
            </form>
        </Form>
    )
}

export default EventForm