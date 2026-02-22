import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('search');
  };

  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1630002931917-964ccb95d0a5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className='hero-overlay'></div>
      <div className='hero-content text-neutral-content text-center'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>Welcome to Art Explorer</h1>
          <p className='mb-5'>
            Discover masterpieces from the Art Institute of Chicago, explore
            artworks, save your favorites, and add personal notes—all in one
            place.
          </p>
          <button
            className='btn btn-primary hover:bg-neutral-content hover:text-primary'
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
