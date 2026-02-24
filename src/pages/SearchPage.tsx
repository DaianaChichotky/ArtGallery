import { useState, useEffect } from 'react';
import ArtworkCard from '../components/card/ArtworkCard';
import type { Artwork } from '../schemas/artwork.schema';
import { getArtwork } from '../api/artwork';
import { MdSearch } from 'react-icons/md';
import { useFavorites } from '../hooks/useFavorites';
import { useFilteredArtworks } from '../hooks/useFilteredArtworks';

const SearchPage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const { favorites, toggleFavorite } = useFavorites();
  const filtered = useFilteredArtworks(artworks, searchTerm);

  useEffect(() => {
    getArtwork().then(setArtworks).catch(console.error);
  }, []);

  const showMore = visibleCount < filtered.length;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold text-center text-primary mt-6 mb-4'>
        Explorer
      </h1>

      {/* Search bar */}
      <div className='flex justify-center mb-8'>
        <label className='input input-bordered flex items-center gap-2 w-full max-w-md'>
          <MdSearch className='text-xl opacity-70' />
          <input
            type='text'
            className='grow'
            placeholder='Search artworks...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      {/* Artworks grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {filtered.slice(0, visibleCount).map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            isFavorite={favorites.some((f) => f.id === artwork.id)}
            onAddToGallery={toggleFavorite}
          />
        ))}

        {/* Show More / Show Less */}
        {filtered.length > 9 && (
          <div className='col-span-full flex justify-center mt-4'>
            <button
              className='btn btn-outline'
              onClick={() => setVisibleCount(showMore ? visibleCount + 3 : 9)}
            >
              {showMore ? 'Show More' : 'Show Less'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
