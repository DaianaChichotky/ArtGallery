import { useState } from 'react';
import toast from 'react-hot-toast';
import type { Artwork } from '../schemas/artwork.schema';

export type ArtworkWithNote = Artwork & { note?: string };

export const useFavorites = (storageKey = 'gallery') => {
  const [favorites, setFavorites] = useState<Artwork[]>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (artwork: ArtworkWithNote) => {
    const exists = favorites.some((item) => item.id === artwork.id);
    let updated: ArtworkWithNote[];

    if (exists) {
      updated = favorites.filter((item) => item.id !== artwork.id);
      toast.error('Removed from My Gallery');
    } else {
      updated = [...favorites, { ...artwork, note: '' }];
      toast.success('Artwork added to My Gallery! ⭐');
    }

    setFavorites(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return { favorites, toggleFavorite };
};
