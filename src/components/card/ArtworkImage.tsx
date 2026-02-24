type ArtworkImageProps = {
  imageUrl: string | null;
  title: string;
  onClick?: () => void;
};

const ArtworkImage = ({ imageUrl, title, onClick }: ArtworkImageProps) => {
  if (!imageUrl) {
    return (
      <div className='h-40 sm:h-48 md:h-56 w-full flex items-center justify-center text-center text-gray-600'>
        <span>No image available</span>
      </div>
    );
  }

  return (
    <figure
      className='h-40 sm:h-48 md:h-56 w-full overflow-hidden flex items-center justify-center cursor-pointer'
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className='h-40 sm:h-48 md:h-56 w-full object-cover'
      />
    </figure>
  );
};

export default ArtworkImage;
