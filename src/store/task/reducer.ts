/** @format */

import { handleActions, Action } from 'redux-actions';

import * as types from './actionTypes';
import initialState from './store';
import { IStatusData } from './type';

export default handleActions(
  {
    [`${types.SET_COMMON_STATUS}`]: (state: IStatusData, action: Action<Partial<IStatusData>>) => ({
      ...state,
      ...action.payload
    })
  },
  initialState
);
