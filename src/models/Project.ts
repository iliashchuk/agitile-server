import mongoose, { Schema, Document, Model, ObjectId, Types } from 'mongoose';
import { ProjectParams } from '../domain';

interface Project {
  owner: string;
  repo: string;
  prefix: string;
  seq: number;
  generateDisplayId(): string;
}
interface ProjectDocument extends Project, Document {}

interface ProjectModel extends Model<ProjectDocument> {}

const ProjectSchema = new Schema<ProjectDocument, ProjectModel>({
  owner: { type: String, required: true },
  repo: { type: String, required: true },
  prefix: {
    type: String,
    default: 'AGT',
    uppercase: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

ProjectSchema.methods.generateDisplayId = async function (
  this: ProjectDocument
) {
  const newProject = `${this.prefix}-${this.seq}`;
  this.seq = this.seq + 1;
  await this.save();

  return newProject;
};

ProjectSchema.index({ owner: 1, repo: 1 }, { unique: true });

export const ProjectModel = mongoose.model<ProjectDocument, ProjectModel>(
  'Project',
  ProjectSchema
);

export const generateProjectDisplayID = async (
  projectParams: ProjectParams
) => {
  const project = await ProjectModel.findOne(projectParams);
  if (!project) {
    return;
  }
  return await project.generateDisplayId();
};
