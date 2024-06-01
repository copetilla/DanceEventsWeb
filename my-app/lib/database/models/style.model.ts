import { Schema, model, models, Document } from "mongoose";

export interface IStyle extends Document {
    _id: string;
    name: string;
}

const StyleSchema = new Schema({
    name: { type: String, required: true, unique: true },

})

const Style = models.Style || model('Style', StyleSchema);

export default Style