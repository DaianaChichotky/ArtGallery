import { MdStar, MdStarBorder, MdDelete, MdNote } from 'react-icons/md';

type ArtworkActionsProps = {
  isFavorite?: boolean;
  onAddToGallery?: () => void;
  onRemove?: () => void;
  onOpenNote?: () => void;
};

const ArtworkActions = ({
  isFavorite = false,
  onAddToGallery,
  onRemove,
  onOpenNote,
}: ArtworkActionsProps) => (
  <div className='card-actions flex justify-center mt-2 gap-2'>
    {onAddToGallery && (
      <button
        className='text-yellow-400 text-2xl cursor-pointer'
        onClick={onAddToGallery}
        title={isFavorite ? 'Remove from My Gallery' : 'Add to My Gallery'}
      >
        {isFavorite ? <MdStar /> : <MdStarBorder />}
      </button>
    )}

    {onRemove && (
      <button
        className='text-gray-400 text-xl cursor-pointer hover:text-red-500'
        onClick={onRemove}
        title='Remove from My Gallery'
      >
        <MdDelete />
      </button>
    )}

    {onOpenNote && (
      <button
        className='text-primary text-xl cursor-pointer hover:text-yellow-200'
        onClick={onOpenNote}
        title='Open note'
      >
        <MdNote />
      </button>
    )}
  </div>
);

export default ArtworkActions;
