import mongoose, { Schema, Document } from "mongoose";

export interface IHobby extends Document {
    title: {
        tr: string;
        en: string;
    };
    description: {
        tr: string;
        en: string;
    };
    icon: string;
    order?: number;
}

const HobbySchema: Schema = new Schema(
    {
        title: {
            tr: { type: String, required: true },
            en: { type: String, required: true }
        },
        description: {
            tr: { type: String, required: true },
            en: { type: String, required: true }
        },
        icon: { type: String, required: true },
        order: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default mongoose.model<IHobby>("Hobby", HobbySchema);
