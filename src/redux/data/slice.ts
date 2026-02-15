import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Category, Status } from '@/types';
import { FAILURE, INITIALSTATUS, LOADING, SUCCESS } from '@/constants/status';

import { getCategoryList } from './actions';

type StateTypes = {
  categories: null | Category[];
  status: {
    category: Status;
  };
  error: {
    category: null | AxiosError;
  };
};

const initialState: StateTypes = {
  categories: null,
  status: { category: INITIALSTATUS },
  error: { category: null },
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategoryList.pending, state => {
        state.status.category = { ...LOADING };
      })
      .addCase(getCategoryList.fulfilled, (state, { payload }) => {
        state.status.category = { ...SUCCESS };
        state.categories = payload;
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.status.category = { ...FAILURE };
        state.error.category = action.payload as AxiosError;
      });
  },
});

export default slice.reducer;
