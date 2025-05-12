import { Response } from 'express';
import Task from '../models/task.model';
import { AuthenticatedRequest } from '../middleware/auth';
import { z } from 'zod';

// Task input validation with Zod
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed'])
});

export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ error: 'Invalid or missing token' });
    }

    const tasks = await Task.find({ user: req.userId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: 'No tasks found for this user' });
    }

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: 'Error getting tasks: Internal Server Error' });
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.format() });
    }

    const { title, description, status } = parsed.data;

    const newTask = new Task({
      title,
      description,
      status,
      user: req.userId,
    });

    await newTask.save();
    return res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating task: Internal Server Error' });
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsed = taskSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.format() });
    }

    const { id } = req.params;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      parsed.data,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (err) {
    return res.status(500).json({ error: 'Error updating task: Internal Server Error' });
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error deleting task: Internal Server Error' });
  }
};