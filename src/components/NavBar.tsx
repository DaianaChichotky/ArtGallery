import { useState } from 'react';

const NavBar = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme') ?? 'abyss';
    document.documentElement.setAttribute('data-theme', saved);
    return saved === 'abyss';
  });

  const handleToggle = (checked: boolean) => {
    const newTheme = checked ? 'abyss' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsDark(checked);
  };

  return (
    <div className='navbar text-primary px-4'>
      <div className='flex-1'>
        <a className='text-xl font-bold'>Art Explorer</a>
      </div>
      {/* Theme Controller */}
      <div className='flex-none'>
        <label className='flex items-center gap-2 cursor-pointer'>
          {/* Sun */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={!isDark ? 'text-primary' : ''}
          >
            <circle cx='12' cy='12' r='5' />
            <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
          </svg>

          {/* Toggle */}
          <input
            type='checkbox'
            className='toggle'
            checked={isDark}
            onChange={(e) => handleToggle(e.target.checked)}
          />

          {/* Moon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={isDark ? 'text-primary' : ''}
          >
            <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default NavBar;
