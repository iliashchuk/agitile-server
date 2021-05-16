import { IMiddleware } from 'koa-router';

import { ProjectParams } from '../domain';
import { ProjectModel } from '../models/Project';

interface PrefixRequest {
  prefix: string;
}

export const getProject: IMiddleware = async (ctx) => {
  ctx.body = await ProjectModel.findOne(ctx.request.query);
};

export const createProject: IMiddleware = async (ctx) => {
  const projectParams = <ProjectParams & PrefixRequest>ctx.request.body;

  const project = await new ProjectModel(projectParams);

  project.save();
  ctx.body = project;

  return project;
};
