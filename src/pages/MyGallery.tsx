import ArtworkCard from '../components/card/ArtworkCard';
import { useGallery } from '../hooks/useGallery';

const MyGallery = () => {
  const { gallery, removeArtwork, updateNote } = useGallery();

  if (gallery.length === 0) {
    return (
      <div className='p-10 text-center'>
        <h2 className='text-xl'>Your gallery is empty 🎨</h2>
      </div>
    );
  }
  return (
    <>
      <h1 className='text-3xl font-bold text-center text-primary mt-6 mb-4'>
        My Gallery
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mb-5'>
        {gallery.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onRemove={() => removeArtwork(artwork.id)}
            onNoteChange={(id, value) => updateNote(id, value)}
          />
        ))}
      </div>
    </>
  );
};

export default MyGallery;
