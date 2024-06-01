'use server'

import { connectToDatabase } from "../database";
import Style from "../database/models/style.model";
import { handleError } from "../utils";


export const getAllStyles = async () => {


    try {

        await connectToDatabase();

        const styles = await Style.find()

        return JSON.parse(JSON.stringify(styles))

    } catch (error) {
        handleError(error)
    }
}