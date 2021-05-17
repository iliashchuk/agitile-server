import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export enum TicketType {
  Story = 'Story',
  Task = 'Task',
  Bugfix = 'Bugfix',
}

export enum TicketStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Review = 'Review',
  Done = 'Done',
}

export interface Subtask {
  displayId: string;
  name: string;
  isCompleted: boolean;
}

export interface Ticket {
  displayId?: string;
  name: string;
  status: TicketStatus;
  type: TicketType;
  description?: string;
  subtasks?: Subtask[];
  assignee?: string;
  completedAt?: string;
  storyPoints: number;
  owner: string;
  repo: string;
}

const SubtaskSchema = new Schema(
  {
    displayId: String,
    name: { type: String, required: true },
    isCompleted: { type: Boolean, default: true },
  },
  { id: false }
);

export interface TicketDocument extends Ticket, Document<Types.ObjectId> {
  displayId: string;
}

interface TicketModel extends Model<TicketDocument> {}

export const TicketSchema = new Schema<TicketDocument, TicketModel>({
  displayId: String,
  name: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(TicketStatus),
    default: TicketStatus.ToDo,
  },
  type: { type: String, enum: Object.values(TicketType), required: true },
  subtasks: {
    type: [SubtaskSchema],
    default: [],
  },
  completedAt: String,
  storyPoints: { type: Number, required: true },
  description: String,
  assignee: String,
  owner: { type: String, required: true },
  repo: { type: String, required: true },
});

TicketSchema.index({ owner: 1, repo: 1 });

export const TicketModel = mongoose.model<TicketDocument, TicketModel>(
  'Ticket',
  TicketSchema
);
