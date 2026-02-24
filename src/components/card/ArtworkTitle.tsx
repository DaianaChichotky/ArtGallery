type ArtworkTitleProps = {
  title: string;
  maxLength?: number;
};

const ArtworkTitle = ({ title, maxLength = 16 }: ArtworkTitleProps) => (
  <h2 className='card-title justify-center text-sm text-center'>
    {title.length > maxLength ? title.slice(0, maxLength) + '...' : title}
  </h2>
);

export default ArtworkTitle;
