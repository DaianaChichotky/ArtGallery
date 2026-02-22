import { ArtworkResponseSchema } from '../schemas/artwork.schema';
import type { Artwork } from '../schemas/artwork.schema';
import { z } from 'zod/v4';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getArtwork(): Promise<Artwork[]> {
  const response = await fetch(API_URL);

  if (!response.ok)
    throw new Error(`Network response was not ok: ${response.statusText}`);

  const resData = await response.json();
  const { data, error, success } = ArtworkResponseSchema.safeParse(resData);
  if (!success) throw new Error(z.prettifyError(error));
  return data.data;
}

try {
  const artworks = await getArtwork();
  artworks.forEach((artwork) => {
    console.log('ID:', artwork.id);
    console.log('Title:', artwork.title);
    console.log('Artist Title:', artwork.artist_title);
    console.log('Image:', artwork.image_id);
  });
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Could not display product:', error.message);
  } else {
    console.log('Something went wrong');
  }
}
