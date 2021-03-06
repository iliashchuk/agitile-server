import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose';

import { TicketDocument } from './Ticket';

export enum SprintStatus {
  Finished = 'Finished',
  InProgress = 'In Progress',
  Planned = 'Planned',
}

export interface Sprint {
  _id?: ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SprintStatus;
  owner: string;
  repo: string;
}

export interface SprintDocument extends Sprint, Document<ObjectId> {
  tickets: TicketDocument['_id'][];
}
export interface SprintPopulateDocument extends Sprint, Document<ObjectId> {
  tickets: TicketDocument[];
}

interface SprintModel extends Model<SprintDocument> {}

export const SprintSchema = new Schema<SprintDocument, SprintModel>({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(SprintStatus),
    default: SprintStatus.Planned,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
    default: new Date(),
  },
  tickets: {
    type: [String],
    ref: 'Ticket',
    default: [],
  },
  owner: { type: String, required: true },
  repo: { type: String, required: true },
});

SprintSchema.index({ owner: 1, repo: 1 });

export const SprintModel = mongoose.model<SprintDocument, SprintModel>(
  'Sprint',
  SprintSchema
);
