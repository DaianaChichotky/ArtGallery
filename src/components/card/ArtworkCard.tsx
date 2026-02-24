import { useState } from 'react';
import type { Artwork } from '../../schemas/artwork.schema';
import ArtworkTitle from './ArtworkTitle';
import ArtworkImage from './ArtworkImage';
import ArtworkActions from './ArtworkActions';
import NoteModal from './NoteModal';
import ImageModal from './ImageModal';

export type ArtworkWithNote = Artwork & { note?: string };

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
      <ArtworkTitle title={artwork.title} />
      <ArtworkImage
        imageUrl={imageUrl}
        title={artwork.title}
        onClick={() => setImageModalOpen(true)}
      />
      <p className='text-gray-500 text-sm text-center'>
        {artwork.artist_title ?? 'Unknown Artist'}
      </p>

      <ArtworkActions
        isFavorite={isFavorite}
        {...(onAddToGallery
          ? { onAddToGallery: () => onAddToGallery(artwork) }
          : {})}
        {...(onRemove ? { onRemove: () => onRemove(artwork.id) } : {})}
        {...(onNoteChange ? { onOpenNote: () => setModalOpen(true) } : {})}
      />

      <NoteModal
        open={modalOpen}
        noteValue={noteValue}
        onChange={setNoteValue}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
        onClose={() => setModalOpen(false)}
      />

      {imageUrl && (
        <ImageModal
          open={imageModalOpen}
          imageUrl={imageUrl}
          title={artwork.title}
          onClose={() => setImageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ArtworkCard;
