import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  label?: string | number;
  onClick?: () => void;
}

const ThreadsCardButton: React.FC<Props> = ({ label, onClick, children }) => {
  return (
    <button className='flex gap-1 items-center text-muted-foreground' onClick={onClick}>
      {children}
      {label && <p>{label}</p>}
    </button>
  );
};

export default ThreadsCardButton;
