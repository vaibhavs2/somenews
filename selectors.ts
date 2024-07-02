import type { News, AppState } from "../types/types";

export const getTopHeadlines = (state: AppState): Array<News> =>
  state.topHeadlines;

export const getEveryNews = (state: AppState): Array<News> => state.everything;

export const getAppOnline = (state: AppState): boolean => state.isOnline;

export const getLoading = (state: AppState): boolean => state.loading;
