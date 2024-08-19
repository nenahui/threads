import { fetchPosts } from '@/pages/home/homeThunks';
import { type IApiPost } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface HomeState {
  posts: IApiPost[];
  isLoading: boolean;
}

const initialState: HomeState = {
  posts: [],
  isLoading: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: apiPosts }) => {
        state.posts = apiPosts;
        state.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectHomePosts: (state) => state.posts,
    selectHomeIsLoading: (state) => state.isLoading,
  },
});

export const { selectHomePosts, selectHomeIsLoading } = homeSlice.selectors;
export default homeSlice.reducer;
