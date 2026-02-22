import { BrowserRouter, Route, Routes } from 'react-router';
import { MainLayout } from './layouts';
import { HomePage, SearchPage, MyGallery } from './pages';
import { Toaster } from 'react-hot-toast';

const App = () => (
  <>
    <Toaster position='top-center' />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='mygallery' element={<MyGallery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
