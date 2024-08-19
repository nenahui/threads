import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { IApiPost, IApiPosts, IPost, TPostMutation } from '@/types';
import { lorelei } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk<IApiPost[], void, { state: RootState }>('home/fetch', async () => {
  const { data: apiPosts } = await axiosApi.get<IApiPosts | null>('/posts.json');

  if (!apiPosts) {
    return [];
  }

  return Object.keys(apiPosts).map((key) => ({
    id: key,
    ...apiPosts[key],
  }));
});

export const createPost = createAsyncThunk<void, TPostMutation>('home/create', async (post) => {
  const avatar = createAvatar(lorelei, {
    seed: new Date().toISOString(),
  });

  await axiosApi.post('/posts.json', {
    ...post,
    date: new Date().toISOString(),
    image: avatar.toDataUri(),
    likes: 0,
  });
});

export const likePost = createAsyncThunk<void, string>('home/like', async (id) => {
  const { data: oldValue } = await axiosApi.get<IPost>(`/posts/${id}.json`);

  await axiosApi.patch(`/posts/${id}.json`, {
    likes: oldValue.likes + 1,
  });
});
