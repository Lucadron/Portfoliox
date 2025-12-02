import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    title: {
        tr: string;
        en: string;
    };
    description: {
        tr: string;
        en: string;
    };
    githubUrl: string;
    liveUrl: string;
    imageUrl: string;
    tags: string[];
    technologies: string[];
    category: "Backend" | "Frontend" | "FullStack" | "ML" | "UI/UX" | "Other";
    order: number;
    highlighted?: boolean;
    viewCount: number;
}

const ProjectSchema: Schema = new Schema(
    {
        title: {
            tr: { type: String, required: true },
            en: { type: String, required: true },
        },
        description: {
            tr: { type: String, required: true },
            en: { type: String, required: true },
        },

        githubUrl: { type: String, required: false },
        liveUrl: { type: String, required: false },
        imageUrl: { type: String, required: false },

        tags: { type: [String], required: false },
        technologies: { type: [String], required: true },

        category: {
            type: String,
            enum: ["Backend", "Frontend", "FullStack", "ML", "UI/UX", "Other"],
            required: true,
        },

        highlighted: { type: Boolean, default: false },
        viewCount: { type: Number, default: 0 },
        order: { type: Number, default: 0 },

    },
    { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
