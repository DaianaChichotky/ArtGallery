import { useEffect, useState } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import type { Artwork } from '../schemas/artwork.schema';
import { getArtwork } from '../api/artwork';
import { MdSearch } from 'react-icons/md';
import toast from 'react-hot-toast'; //npm install react-hot-toast

type ArtworkWithNote = Artwork & { note?: string };

const SearchPage = () => {
  const [artworks, setArtworks] = useState<ArtworkWithNote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<ArtworkWithNote[]>(() => {
    const stored = localStorage.getItem('gallery');
    return stored ? JSON.parse(stored) : [];
  });

  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function loadArtworks() {
      try {
        const data = await getArtwork();
        setArtworks(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadArtworks();
  }, []);

  // Add to Gallery

  const handleToggleFavorite = (artwork: ArtworkWithNote) => {
    const exists = favorites.some((item) => item.id === artwork.id);

    if (exists) {
      const updated = favorites.filter((item) => item.id !== artwork.id);
      setFavorites(updated);
      localStorage.setItem('gallery', JSON.stringify(updated));
      toast.error('Removed from favorites');
    } else {
      const updated = [...favorites, { ...artwork, note: '' }];
      setFavorites(updated);
      localStorage.setItem('gallery', JSON.stringify(updated));
      toast.success('Artwork added to favs! ⭐');
    }
  };

  // Search

  const filtered = artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artwork.artist_title?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false),
  );

  const showMore = visibleCount < filtered.length;

  return (
    <div className='p-4 pb-32'>
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

      {/* Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {filtered.slice(0, visibleCount).map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            isFavorite={favorites.some((f) => f.id === artwork.id)}
            onAddToGallery={handleToggleFavorite}
          />
        ))}
        {/* Show More/Show Less */}

        {filtered.length > 6 && (
          <div className='col-span-full flex justify-center mt-4'>
            <button
              className='btn btn-outline'
              onClick={() => setVisibleCount(showMore ? visibleCount + 3 : 6)}
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
