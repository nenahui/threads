import { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className='mx-auto max-w-[500px] px-2 py-3'>{children}</div>
    </>
  );
};

export default Layout;
