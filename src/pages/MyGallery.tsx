import { useState } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import type { Artwork } from '../schemas/artwork.schema';
import { NoteSchema } from '../schemas/note.schema';
import toast from 'react-hot-toast';

type ArtworkWithNote = Artwork & { note?: string };

const MyGallery = () => {
  const [gallery, setGallery] = useState<ArtworkWithNote[]>(() => {
    const stored = localStorage.getItem('gallery');
    return stored ? JSON.parse(stored) : [];
  });

  // Remove Card
  const handleRemove = (id: number) => {
    const updated = gallery.filter((artwork) => artwork.id !== id);
    setGallery(updated);
    localStorage.setItem('gallery', JSON.stringify(updated));
    toast.error('Artwork removed from favs');
  };

  // If Gallery is empty
  if (gallery.length === 0) {
    return (
      <div className='p-10 text-center'>
        <h2 className='text-xl'>Your gallery is empty 🎨</h2>
      </div>
    );
  }

  // Notes
  const handleNoteChange = (id: number, value: string) => {
    const parsed = NoteSchema.safeParse(value);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Invalid note');

      return;
    }
    const updated = gallery.map((art) =>
      art.id === id ? { ...art, note: parsed.data } : art,
    );
    setGallery(updated);
    localStorage.setItem('gallery', JSON.stringify(updated));
  };

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
            onRemove={handleRemove}
            onNoteChange={handleNoteChange}
          />
        ))}
      </div>
    </>
  );
};

export default MyGallery;
