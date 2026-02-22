import { BrowserRouter, Route, Routes } from 'react-router';
import { MainLayout } from './layouts';
import { HomePage, SearchPage, MyGallery } from './pages';
import { Toaster } from 'react-hot-toast';

const App = () => (
  <div className='min-h-screen flex items-center justify-center bg-base-200 p-6'>
    <Toaster position='top-center' />

    <div className='mockup-phone border-primary shadow-2xl'>
      <div className='mockup-phone-camera'></div>

      <div className='mockup-phone-display'>
        <div className='h-full w-full overflow-y-auto bg-base-100'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='search' element={<SearchPage />} />
                <Route path='mygallery' element={<MyGallery />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  </div>
);

export default App;
