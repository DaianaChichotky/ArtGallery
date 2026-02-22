import { NavLink } from 'react-router';

const Dock = () => {
  return (
    <div className='dock bg-primary h-24 text-secondary-content'>
      {/* Home */}
      <NavLink
        to='/'
        end
        className={({ isActive }) => (isActive ? 'dock-active' : '')}
      >
        <svg
          className='size-[1.2em]'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M3 11L12 3l9 8' />
          <path d='M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10' />
        </svg>

        <span className='dock-label'>Home</span>
      </NavLink>

      {/* Search */}
      <NavLink
        to='/search'
        className={({ isActive }) => (isActive ? 'dock-active' : '')}
      >
        <svg
          className='size-[1.2em]'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='11' cy='11' r='8' />
          <line x1='21' y1='21' x2='16.65' y2='16.65' />
        </svg>
        <span className='dock-label'>Search</span>
      </NavLink>

      {/* My Gallery */}
      <NavLink
        to='/mygallery'
        className={({ isActive }) => (isActive ? 'dock-active' : '')}
      >
        <svg
          className='size-[1.2em]'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polygon points='12 2 15 8.5 22 9.3 17 14.2 18.5 21 12 17.5 5.5 21 7 14.2 2 9.3 9 8.5 12 2' />
        </svg>
        <span className='dock-label'>My Gallery</span>
      </NavLink>
    </div>
  );
};

export default Dock;
