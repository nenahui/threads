export interface IPost {
  author: string;
  date: string;
  message: string;
  image: string;
  likes: number;
}

export interface IApiPost extends IPost {
  id: string;
}

export interface IApiPosts {
  [id: string]: IApiPost;
}

export type TPostMutation = Omit<IPost, 'date' | 'image' | 'likes'>;
