import mongoose, { Schema, Types, Document, Model } from 'mongoose';
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

export interface Ticket {
  name: string;
  status: TicketStatus;
  type: TicketType;
  description?: string;
  subtasks?: Subtask[];
  assignee?: string;
}

export interface Subtask {
  name: string;
  isCompleted: boolean;
}

const SubtaskSchema = new Schema({
  name: { type: String, required: true },
  isCompleted: { type: Boolean, default: true },
});

// Export this for strong typing
export interface TicketDocument extends Ticket, Document {}
interface TicketModel extends Model<TicketDocument> {}

export const TicketSchema = new Schema<TicketDocument, TicketModel>({
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
  description: String,
  assignee: String,
});

export const TicketModel = mongoose.model<TicketDocument, TicketModel>(
  'Ticket',
  TicketSchema
);
