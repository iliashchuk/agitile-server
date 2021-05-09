import mongoose, { Schema, Document, Model } from 'mongoose';

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
  _id: string;
  name: string;
  isCompleted: boolean;
}

export interface Ticket {
  _id?: string;
  name: string;
  status: TicketStatus;
  type: TicketType;
  description?: string;
  subtasks?: Subtask[];
  assignee?: string;
}

const SubtaskSchema = new Schema({
  _id: String,
  name: { type: String, required: true },
  isCompleted: { type: Boolean, default: true },
});

export interface TicketDocument extends Ticket, Document<string> {
  _id: string;
}
interface TicketModel extends Model<TicketDocument> {}

export const TicketSchema = new Schema<TicketDocument, TicketModel>({
  _id: String,
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
