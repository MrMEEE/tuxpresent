import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Presentation from '../models/Presentation';

export const createPresentation = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, template } = req.body;

    const presentation = await Presentation.create({
      title,
      description,
      template,
      owner: req.user._id,
      slides: []
    });

    res.status(201).json(presentation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPresentations = async (req: AuthRequest, res: Response) => {
  try {
    const presentations = await Presentation.find({
      $or: [
        { owner: req.user._id },
        { collaborators: req.user._id }
      ]
    }).sort({ updatedAt: -1 });

    res.json(presentations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPresentation = async (req: AuthRequest, res: Response) => {
  try {
    const presentation = await Presentation.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('collaborators', 'name email');

    if (!presentation) {
      return res.status(404).json({ message: 'Presentation not found' });
    }

    // Check access
    const hasAccess = 
      presentation.owner._id.toString() === req.user._id.toString() ||
      presentation.collaborators.some((c: any) => c._id.toString() === req.user._id.toString()) ||
      presentation.isPublic;

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(presentation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePresentation = async (req: AuthRequest, res: Response) => {
  try {
    const presentation = await Presentation.findById(req.params.id);

    if (!presentation) {
      return res.status(404).json({ message: 'Presentation not found' });
    }

    // Check if user is owner or collaborator
    const hasAccess = 
      presentation.owner.toString() === req.user._id.toString() ||
      presentation.collaborators.some(c => c.toString() === req.user._id.toString());

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedPresentation = await Presentation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPresentation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePresentation = async (req: AuthRequest, res: Response) => {
  try {
    const presentation = await Presentation.findById(req.params.id);

    if (!presentation) {
      return res.status(404).json({ message: 'Presentation not found' });
    }

    // Only owner can delete
    if (presentation.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only owner can delete' });
    }

    await Presentation.findByIdAndDelete(req.params.id);

    res.json({ message: 'Presentation deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addCollaborator = async (req: AuthRequest, res: Response) => {
  try {
    const presentation = await Presentation.findById(req.params.id);

    if (!presentation) {
      return res.status(404).json({ message: 'Presentation not found' });
    }

    // Only owner can add collaborators
    if (presentation.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only owner can add collaborators' });
    }

    const { userId } = req.body;
    
    if (!presentation.collaborators.includes(userId)) {
      presentation.collaborators.push(userId);
      await presentation.save();
    }

    res.json(presentation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
