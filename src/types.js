/* @flow strict-local */

import {
  ADD_TOP_HEADLINES,
  ADD_EVERY_NEWS,
  LOADING,
  MODE_ONLINE,
} from './actionConstants';

type newsSource = {|id: string, name: string|};

export type News = {|
  source: newsSource,
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  content: string,
|};

export type AppState = {|
  everything: Array<News>,
  topHeadlines: Array<News>,
  loading: boolean,
  isOnline: boolean,
|};

type ActionNewsAdd = {|
  type: typeof ADD_TOP_HEADLINES | typeof ADD_EVERY_NEWS,
  payload: Array<News>,
  refresh: boolean,
|};

type ActionLoading = {
  type: typeof LOADING,
  payload: boolean,
};

type ActionAppConnection = {
  type: typeof MODE_ONLINE,
  payload: boolean,
};

export type Action = ActionNewsAdd | ActionLoading | ActionAppConnection;

export type DomainObject = {|text: string, domain: string|};
