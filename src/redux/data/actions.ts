import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { getDataList } from '@/api/helpers';
import { Category } from '@/types';

export const getCategoryList = createAsyncThunk<Category[], void, { rejectValue: AxiosError }>(
  'categories/getDataList',
  async (_, thunkAPI) => {
    try {
      const res = await getDataList<Category>('news_categories', {
        parent: `is.null`,
        select: '*,children:news_categories(*)',
      });
      return res;
    } catch (err) {
      const error = err as AxiosError;
      throw thunkAPI.rejectWithValue(error);
    }
  },
);
