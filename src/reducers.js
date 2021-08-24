/* @flow strict-local */
import type {Action, News, AppState} from './types';
import {
  ADD_TOP_HEADLINES,
  ADD_EVERY_NEWS,
  LOADING,
  MODE_ONLINE,
} from './actionConstants';

const initialState: AppState = {
  everything: [],
  topHeadlines: [],
  loading: false,
  isOnline: false,
};

export function indexReducer(
  state: AppState = initialState,
  action: Action,
): AppState {
  switch (action.type) {
    case ADD_EVERY_NEWS:
      return {
        ...state,
        everything: action.refresh
          ? action.payload
          : state.everything.concat(action.payload),
        loading: false,
      };

    case ADD_TOP_HEADLINES:
      return {
        ...state,
        topHeadlines: action.refresh
          ? action.payload
          : state.topHeadlines.concat(action.payload),
        loading: false,
      };

    case MODE_ONLINE:
      return {...state, isOnline: action.payload};

    case LOADING:
      return {...state, loading: action.payload};

    default:
      return state;
  }
}
