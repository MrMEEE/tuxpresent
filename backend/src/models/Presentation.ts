import mongoose, { Document, Schema } from 'mongoose';

export interface ISlide {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: any;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: number;
  style: any;
}

export interface IPresentation extends Document {
  title: string;
  description?: string;
  owner: mongoose.Types.ObjectId;
  collaborators: mongoose.Types.ObjectId[];
  slides: ISlide[];
  template?: string;
  thumbnail?: string;
  isPublic: boolean;
  settings: {
    backgroundColor: string;
    transition: string;
    transitionDuration: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const slideSchema = new Schema<ISlide>({
  id: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'shape'], required: true },
  content: { type: Schema.Types.Mixed, required: true },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 }
  },
  rotation: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 }
  },
  scale: { type: Number, default: 1 },
  style: { type: Schema.Types.Mixed, default: {} }
}, { _id: false });

const presentationSchema = new Schema<IPresentation>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  slides: [slideSchema],
  template: {
    type: String
  },
  thumbnail: {
    type: String
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  settings: {
    backgroundColor: { type: String, default: '#ffffff' },
    transition: { type: String, default: 'slide' },
    transitionDuration: { type: Number, default: 800 }
  }
}, {
  timestamps: true
});

// Index for faster queries
presentationSchema.index({ owner: 1, createdAt: -1 });
presentationSchema.index({ collaborators: 1 });

export default mongoose.model<IPresentation>('Presentation', presentationSchema);
