import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  level: number; // 0–100 (yüzde)
  category: "Frontend" | "Backend" | "Tools";
  order?: number;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Tools"],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ISkill>("Skill", SkillSchema);
