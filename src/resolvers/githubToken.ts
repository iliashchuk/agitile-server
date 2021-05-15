import { IMiddleware } from 'koa-router';
import { getAccessTokenFromCode } from '../services/githubOauth';

interface TokenRequest {
  code: string;
}

export const getGithubAccessTokenFromCode: IMiddleware = async (ctx) => {
  const { code } = <TokenRequest>ctx.request.body;

  const accessToken = await getAccessTokenFromCode(code);

  ctx.body = accessToken;
};
