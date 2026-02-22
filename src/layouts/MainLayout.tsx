import { Outlet } from 'react-router';
import { NavBar, Dock } from '../components';

const MainLayout = () => {
  return (
    <div className='flex flex-col h-full'>
      <NavBar />
      <main className='flex-1 overflow-y-auto'>
        <Outlet />
      </main>
      <Dock />
    </div>
  );
};

export default MainLayout;
