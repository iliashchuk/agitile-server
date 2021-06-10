import axios from 'axios';
import querystring from 'query-string';

const { GITHUB_APP_ID, GITHUB_APP_SECRET } = process.env;

export const getAccessTokenFromCode = async (code: string) => {
  const { data } = await axios({
    url: 'https://github.com/login/oauth/access_token',
    method: 'post',
    params: {
      client_id: GITHUB_APP_ID,
      client_secret: GITHUB_APP_SECRET,
      code,
    },
  });

  const parsedData = querystring.parse(data);

  if (parsedData.error)
    throw new Error(
      typeof parsedData.error === 'string'
        ? parsedData.error
        : parsedData.error[0]
    );

  return parsedData.access_token;
};
