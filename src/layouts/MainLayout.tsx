import { Outlet } from 'react-router';
import { NavBar, Dock } from '../components';

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='grow'>
        <Outlet />
      </main>
      <Dock />
    </div>
  );
};

export default MainLayout;
