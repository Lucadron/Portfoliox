import { Request, Response } from 'express';
import { createProjectSchema, updateProjectSchema } from '../validators/project.validator';
import { createProject, getAllProjects, getOneProject, updateProject, deleteProject } from '../services/project.service';
import { deleteModel } from 'mongoose';
import id from 'zod/v4/locales/id.cjs';
import { incrementProjectViews } from '../services/stats.service';

// Yeni proje oluştur
export const handleCreateProject = async (req: Request, res: Response) => {
    try {
        // Validasyon
        const parsed = createProjectSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.issues });
        }

        // Kayıt
        const newProject = await createProject(parsed.data);

        return res.status(201).json(newProject);
    } catch (error) {
        console.error('Project creation error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Tüm projeleri getir
export const handleGetAllProjects = async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang === "en" ? "en" : "tr"; // default: tr

        const projects = await getAllProjects();

        const localized = projects.map(project => ({
            ...project.toObject(),
            title: project.title[lang],
            description: project.description[lang],
        }));

        return res.status(200).json(localized);
    } catch (error) {
        console.error('Project fetch error', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Id ile proje getir
export const handleGetOneProject = async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang === "en" ? "en" : "tr";
        const { id } = req.params;

        const project = await getOneProject(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        await incrementProjectViews(id);

        return res.status(200).json({
            ...project.toObject(),
            title: project.title[lang],
            description: project.description[lang],
        });
    } catch (error) {
        console.error('Get one project error: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Projeyi düzenle
export const handleUpdateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const parsed = updateProjectSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.issues });
        }

        const updatedProject = await updateProject(id, parsed.data);

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Project update error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//Proje silme
export const handleDeleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleted = await deleteProject(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(200).json({ message: 'Project deleted succesfully' });
    } catch (error) {
        console.error('Project delete error: ', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};