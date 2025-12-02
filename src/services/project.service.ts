import Project from '../models/project.model';
import { CreateProjectInput, UpdateProjectInput } from '../validators/project.validator';

// Servis katmanı, controller ile model arasında iş mantığını içerir
export const createProject = async (input: CreateProjectInput) => {
  const project = await Project.create(input);
  return project;
};

// Tüm projeleri getir
export const getAllProjects = async () => {
  return await Project.find().sort({ order: 1, createdAt: -1 });
};

//Id ile proje getir
export const getOneProject = async (id: string) => {
  return await Project.findById(id)
};

// Proje güncelleme fonksiyonu, new: true → güncellenmiş halini döndürmesini sağlar
export const updateProject = async (id: string, data: UpdateProjectInput) => {
  const updated = await Project.findByIdAndUpdate(id, data, { new: true });
  return updated;
};

// Proje silme
export const deleteProject = async (id: string) => {
  return await Project.findByIdAndDelete(id);
};
