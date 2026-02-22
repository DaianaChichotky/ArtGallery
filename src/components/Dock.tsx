import { NavLink } from 'react-router';
import { MdHome, MdSearch, MdStar } from 'react-icons/md';

const Dock = () => {
  return (
    <div className='dock dock-md bg-primary text-secondary-content relative! bottom-0! left-auto! right-auto! text-2xl'>
      {/* Home */}
      <NavLink
        to='/'
        end
        className={({ isActive }) => (isActive ? 'dock-active' : '')}
      >
        <MdHome />
        <span className='dock-label'>Home</span>
      </NavLink>

      {/* Search */}
      <NavLink
        to='/search'
        className={({ isActive }) => (isActive ? 'dock-active' : '')}
      >
        <MdSearch />
        <span className='dock-label'>Search</span>
      </NavLink>

      {/* My Gallery */}
      <NavLink
        to='/mygallery'
        className={({ isActive }) => (isActive ? 'dock-active' : '')}
      >
        <MdStar />
        <span className='dock-label'>My Gallery</span>
      </NavLink>
    </div>
  );
};

export default Dock;
