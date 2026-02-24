import { useMemo } from 'react';
import type { Artwork } from '../schemas/artwork.schema';

export const useFilteredArtworks = (
  artworks: Artwork[],
  searchTerm: string,
) => {
  return useMemo(
    () =>
      artworks.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (artwork.artist_title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ??
            false),
      ),
    [artworks, searchTerm],
  );
};
