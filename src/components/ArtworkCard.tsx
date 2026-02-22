import { useState } from 'react';
import type { Artwork } from '../schemas/artwork.schema';
import { MdStarBorder, MdStar, MdDelete, MdNote, MdSave } from 'react-icons/md';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [noteValue, setNoteValue] = useState(artwork.note ?? '');

  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : null;

  const handleSaveNote = () => {
    if (onNoteChange) onNoteChange(artwork.id, noteValue);
    setModalOpen(false);
  };

  const handleDeleteNote = () => {
    setNoteValue('');
    if (onNoteChange) onNoteChange(artwork.id, '');
    setModalOpen(false);
  };

  return (
    <div className='card w-full bg-base-100 shadow-xl relative'>
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

      {/* Action buttons */}
      <div className='card-actions justify-end p-1 flex gap-2'>
        {/* Favorite */}
        {onAddToGallery && (
          <button
            className='text-yellow-400 text-2xl cursor-pointer'
            onClick={() => onAddToGallery(artwork)}
          >
            {isFavorite ? <MdStar /> : <MdStarBorder />}
          </button>
        )}

        {/* Remove card */}
        {onRemove && (
          <button
            className='text-gray-400 text-2xl cursor-pointer hover:text-red-500'
            onClick={() => onRemove(artwork.id)}
            title='Delete artwork'
          >
            <MdDelete />
          </button>
        )}

        {/* Open Note Modal */}
        {onNoteChange && (
          <button
            className='text-primary text-2xl cursor-pointer hover:text-yellow-200'
            onClick={() => setModalOpen(true)}
            title='Open note'
          >
            <MdNote />
          </button>
        )}
      </div>

      {/* Modal for notes */}
      {modalOpen && (
        <dialog open className='modal'>
          <div className='modal-box relative'>
            <h3 className='font-bold text-lg mb-4'>Artwork Note</h3>
            <textarea
              className='textarea textarea-bordered w-full mb-4'
              value={noteValue}
              onChange={(e) => setNoteValue(e.target.value)}
              placeholder='Write your note...'
            />
            <div className='flex justify-end gap-2'>
              <button
                className='btn hover:bg-primary hover:text-primary-content'
                onClick={handleDeleteNote}
                title='Delete note'
              >
                <MdDelete className='inline mr-1' />
              </button>
              <button
                className='btn hover:bg-primary hover:text-primary-content'
                onClick={handleSaveNote}
                title='Save note'
              >
                <MdSave className='inline mr-1' />
              </button>
              <button
                className='btn hover:bg-primary hover:text-primary-content btn-ghost'
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ArtworkCard;
