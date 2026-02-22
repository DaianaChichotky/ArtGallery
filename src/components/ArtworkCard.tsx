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
  const [imageModalOpen, setImageModalOpen] = useState(false);
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
    <div className='h-45 card w-full relative flex flex-col'>
      {/* Title */}
      <h2 className='card-title justify-center text-sm text-center'>
        {artwork.title}
      </h2>

      {/* Image */}
      {imageUrl ? (
        <figure
          className='h-40 sm:h-48 md:h-56 w-full overflow-hidden flex items-center justify-center cursor-pointer'
          onClick={() => imageModalOpen && setImageModalOpen(true)}
        >
          <img
            src={imageUrl}
            alt={artwork.title}
            className='h-40 sm:h-48 md:h-56 w-full object-cover'
            onClick={() => setImageModalOpen(true)}
          />
        </figure>
      ) : (
        <div className='h-40 sm:h-48 md:h-56 w-full flex items-center justify-center bg-gray-200'>
          <span>No image available</span>
        </div>
      )}

      <p className=' text-gray-500 text-sm text-center'>
        {artwork.artist_title ?? 'Unknown Artist'}
      </p>

      {/* Action buttons */}
      <div className='card-actions flex justify-center mt-2'>
        {/* Star */}
        {onAddToGallery && (
          <button
            className='text-yellow-400 text-2xl cursor-pointer'
            onClick={() => onAddToGallery(artwork)}
            title={isFavorite ? 'Remove from gallery' : 'Add to gallery'}
          >
            {isFavorite ? <MdStar /> : <MdStarBorder />}
          </button>
        )}

        {/* Delete card */}
        {onRemove && (
          <button
            className='text-gray-400 text-xl cursor-pointer hover:text-red-500'
            onClick={() => onRemove(artwork.id)}
            title='Delete artwork'
          >
            <MdDelete />
          </button>
        )}

        {/* Open Note Modal */}
        {onNoteChange && (
          <button
            className='text-primary text-xl cursor-pointer hover:text-yellow-200'
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

      {/* Modal images */}
      {imageModalOpen && (
        <dialog open className='modal'>
          <div className='modal-box relative flex items-center justify-center h-130 w-90'>
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary bg-neutral'
              onClick={() => setImageModalOpen(false)}
            >
              ✕
            </button>

            <img
              src={imageUrl!}
              alt={artwork.title}
              className='object-contain'
            />
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ArtworkCard;
