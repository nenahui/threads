import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { LoadingIcon } from '@/assets/loading-icon';
import { PlusIcon } from '@/assets/plus-icon';
import ThreadsCard from '@/components/threadsCard/threadsCard';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'; // Импортируйте кастомный Drawer
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TPostMutation } from '@/types';
import React, { useEffect, useState, useRef } from 'react';
import { selectHomeIsLoading, selectHomePosts } from './homeSlice';
import { createPost, fetchPosts } from './homeThunks';

const initialState: TPostMutation = {
  author: '',
  message: '',
};

const Home = () => {
  const [postMutation, setPostMutation] = useState<TPostMutation>(initialState);
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectHomePosts);
  const isLoading = useAppSelector(selectHomeIsLoading);
  const drawerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    setPostMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postMutation.author || !postMutation.message) {
      return;
    }

    await dispatch(createPost(postMutation));
    dispatch(fetchPosts());

    if (drawerRef.current) {
      drawerRef.current.click();
      setPostMutation({
        ...postMutation,
        message: '',
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={'fixed top-1/2 left-1/2'} style={{ transform: 'translate(-50%, -50%)' }}>
          <LoadingIcon className={'text-muted-foreground animate-spin duration-1000'} />
        </div>
      ) : posts.length === 0 ? (
        <p
          className={'fixed top-1/2 left-1/2 text-muted-foreground text-sm'}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          The list of posts is empty
        </p>
      ) : (
        <div className={'mb-12'}>
          {posts.map((post) => (
            <ThreadsCard post={post} key={post.id} />
          ))}
        </div>
      )}

      <Drawer>
        <DrawerTrigger asChild>
          <button
            className='bg-zinc-900 p-2 px-3.5 rounded-xl fixed bottom-2 left-1/2'
            style={{ transform: 'translateX(-50%)' }}
          >
            <PlusIcon
              className='text-muted-foreground active:text-gray-500 active:scale-95 duration-150'
              width={28}
              height={28}
            />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Новая публикация</DrawerTitle>
            <DrawerDescription>Заполните все нижние поля, чтобы создать публикацию</DrawerDescription>

            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-3'>
                <div className='grid w-full text-left items-center gap-1.5'>
                  <Label htmlFor='author'>Автор</Label>
                  <Input
                    type='text'
                    id='author'
                    name='author'
                    value={postMutation.author}
                    onChange={handleFieldChange}
                    placeholder='Иван Иванов...'
                  />
                </div>

                <div className='grid w-full w-full text-left items-center gap-1.5'>
                  <Label htmlFor='message'>Сообщение</Label>
                  <Input
                    type='text'
                    id='message'
                    name='message'
                    value={postMutation.message}
                    onChange={handleFieldChange}
                    placeholder='Далеко-далеко за словесными горами...'
                  />
                </div>
              </div>

              <DrawerFooter>
                <Button type='submit'>Создать</Button>
                <DrawerClose asChild ref={drawerRef}>
                  <Button variant='outline' className='w-lg max-w-[140px] mx-auto'>
                    Отменить
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Home;
