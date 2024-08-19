import { useAppDispatch } from '@/app/hooks';
import { BubbleChatIcon } from '@/assets/bubble-chat-icon';
import { HeartIcon } from '@/assets/heart-icon';
import { LoadingIcon } from '@/assets/loading-icon';
import { ShareIcon } from '@/assets/share-icon';
import { likePost } from '@/pages/home/homeThunks';
import { IPost } from '@/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import styles from './threadsCard.module.css';
import ThreadsCardButton from './threadsCardButton';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

interface Props {
  post: IPost;
}

const ThreadsCard: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const formatDate = (date: string) => {
    const now = dayjs();
    const inputDate = dayjs(date);

    const diffInMinutes = now.diff(inputDate, 'minute');

    if (diffInMinutes < 1) {
      return 'now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${now.diff(inputDate, 'hour')}h`;
    } else if (now.isSame(inputDate, 'day')) {
      return 'Yesterday';
    } else if (now.isSame(inputDate, 'year')) {
      return inputDate.format('DD MMM');
    } else {
      return inputDate.format('DD MMM, YYYY');
    }
  };

  return (
    <Card className={`rounded-none border-x-0 flex gap-3 py-3 ${styles.threadsCard}`}>
      <Avatar className='p-0'>
        <AvatarImage src={post.image} />
        <AvatarFallback>
          <LoadingIcon className='animate-spin duration-1000 text-muted-foreground' />
        </AvatarFallback>
      </Avatar>
      <div>
        <CardHeader className='p-0 flex-row gap-2 mb-1'>
          <h3 className='leading-none font-medium'>{post.author}</h3>
          <p className='leading-none text-muted-foreground text-sm' style={{ marginTop: 2 }}>
            {formatDate(post.date)}
          </p>
        </CardHeader>

        <CardContent className='p-0 pr-2 mb-3'>
          <p className='text-[14px] leading-5'>{post.message}</p>
        </CardContent>

        <CardFooter className='p-0 gap-4 text-[13px]'>
          <ThreadsCardButton label={post.likes} onClick={() => dispatch(likePost(post.id))}>
            <HeartIcon
              className={`${post.likes > 0 && 'text-red-500'} text-muted-foreground active:text-gray-500 active:scale-95 duration-150`}
              width={20}
              height={20}
            />
          </ThreadsCardButton>

          <ThreadsCardButton label={0}>
            <BubbleChatIcon
              className='text-muted-foreground active:text-gray-500 active:scale-95 duration-150'
              style={{
                transform: 'translate(-100, 0)',
              }}
              width={20}
              height={20}
            />
          </ThreadsCardButton>

          <ThreadsCardButton>
            <ShareIcon
              className='text-muted-foreground active:text-gray-500 active:scale-95 duration-150'
              style={{
                transform: 'translate(-100, 0)',
              }}
              width={20}
              height={20}
            />
          </ThreadsCardButton>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ThreadsCard;
