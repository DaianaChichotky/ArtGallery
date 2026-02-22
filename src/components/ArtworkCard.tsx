import type { Artwork } from '../schemas/artwork.schema';
import { MdStarBorder, MdStar, MdClose } from 'react-icons/md';

type ArtworkWithNote = Artwork & { note?: string };

type ArtworkCardProps = {
  artwork: ArtworkWithNote;
  isFavorite?: boolean;
  onAddToGallery?: (artwork: ArtworkWithNote) => void;
  onRemove?: (id: number) => void;
  onNoteChange?: (id: number, value: string) => void;
};

const ArtworkCard = ({
  artwork,
  isFavorite = false,
  onAddToGallery,
  onRemove,
  onNoteChange,
}: ArtworkCardProps) => {
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : null;

  return (
    <div className='card w-full bg-base-100 shadow-xl'>
      {/* Image */}
      {imageUrl ? (
        <figure className='h-40 sm:h-48 md:h-56 w-full overflow-hidden flex items-center justify-center'>
          <img
            src={imageUrl}
            alt={artwork.title}
            className='h-40 sm:h-48 md:h-56 w-full object-cover'
          />
        </figure>
      ) : (
        <div className='h-40 sm:h-48 md:h-56 w-full flex items-center justify-center bg-gray-200'>
          <span>No image available</span>
        </div>
      )}

      {/* Title */}
      <div className='card-body text-center'>
        <h2 className='card-title justify-center'>{artwork.title}</h2>

        <p className='text-sm text-gray-500'>
          {artwork.artist_title ?? 'Unknown Artist'}
        </p>
      </div>

      {/* Button Add to favs */}
      <div className='card-actions justify-end p-3'>
        {onAddToGallery && (
          <button
            className=' text-yellow-400 text-2xl cursor-pointer'
            onClick={() => onAddToGallery(artwork)}
          >
            {isFavorite ? <MdStar /> : <MdStarBorder />}
          </button>
        )}

        {/* Button Remove from favs */}
        {onRemove && (
          <button
            className=' text-red-500 text-2xl cursor-pointer'
            onClick={() => onRemove(artwork.id)}
          >
            <MdClose />
          </button>
        )}
      </div>

      {/* Button to add/edit notes */}
      {onNoteChange && (
        <div className='p-4 pt-0'>
          <textarea
            className='textarea textarea-bordered w-full'
            placeholder='Write your note...'
            value={artwork.note ?? ''}
            onChange={(e) => onNoteChange(artwork.id, e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default ArtworkCard;
