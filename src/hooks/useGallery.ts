// hooks/useGallery.ts
import { useState } from 'react';
import type { ArtworkWithNote } from '../components/card/ArtworkCard';

export const useGallery = (storageKey = 'gallery') => {
  const [gallery, setGallery] = useState<ArtworkWithNote[]>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  const removeArtwork = (id: number) => {
    const updated = gallery.filter((artwork) => artwork.id !== id);
    setGallery(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const updateNote = (id: number, note: string) => {
    const updated = gallery.map((art) =>
      art.id === id ? { ...art, note } : art,
    );
    setGallery(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return { gallery, removeArtwork, updateNote };
};
