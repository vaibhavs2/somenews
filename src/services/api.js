/* @flow strict-local */

import type {News} from '../types';

type newsType = 'everything' | 'top-headlines';
type APIErrorType = {|status: 'error', code: string, message: string|};
type NewsResponse = {|
  status: 'ok',
  totalResults: number,
  articles: Array<News>,
|};

async function apiRequest(
  method: 'GET' | 'POST',
  newsType: newsType,
  params: string,
) {
  const headers = new Headers({
    Authorization: '94692f5ac2364e1390bc3dbfdc549ef6',
    'Content-Type': 'application/json',
  });

  const fetchUrl = new URL(
    `${newsType}?sortBy=publishedAt&language=en&${params}`,
    'https://newsapi.org/v2/',
  );
  console.log('urrrrrrl', fetchUrl);
  return fetch(fetchUrl.toString(), {headers, method});
}

export async function getSomeNewsInRange(
  newsType: newsType = 'top-headlines',
  from: string,
  to: string,
  page: number,
  pageSize: number,
  domains: Array<string>,
) {
  try {
    const params = `${
      newsType === 'top-headlines' ? 'country=in' : `domains=${domains.join()}`
    }&from=${from}&to${to}&pageSize=${pageSize}&page=${page}`;
    const response = await apiRequest('GET', newsType, params);
    const json = await response.json().catch(() => undefined);
    if (json.status === 'ok' && json !== undefined) {
      return json;
    }
    throw new Error(json.message || 'Got some error, try later!');
  } finally {
    // don't need this for now
  }
}
