/* @flow strict-local */

import type {Action, News} from './types';
import {
  ADD_TOP_HEADLINES,
  ADD_EVERY_NEWS,
  LOADING,
  MODE_ONLINE,
} from './actionConstants';

export const addTopHeadlines = (
  newsList: Array<News>,
  refresh: boolean,
): Action => ({
  type: ADD_TOP_HEADLINES,
  payload: newsList,
  refresh,
});

export const addEveryThingNews = (
  newsList: Array<News>,
  refresh: boolean,
): Action => ({
  type: ADD_EVERY_NEWS,
  payload: newsList,
  refresh,
});

export const addLoading = (status: boolean): Action => ({
  type: LOADING,
  payload: status,
});

export const appOnline = (isConnected: boolean): Action => ({
  type: MODE_ONLINE,
  payload: isConnected,
});
