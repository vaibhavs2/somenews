/* @flow strict-local */

import type {Action, News, AppState} from './types';

export const getTopHeadlines = (state: AppState): Array<News> =>
  state.topHeadlines;

export const getEveryNews = (state: AppState): Array<News> => state.everything;

export const getAppOnline = (state: AppState): boolean => state.isOnline;

export const getLoading = (state: AppState): boolean => state.loading;
