type ImageModalProps = {
  open: boolean;
  imageUrl: string;
  title: string;
  onClose: () => void;
};

const ImageModal = ({ open, imageUrl, title, onClose }: ImageModalProps) => {
  if (!open) return null;

  return (
    <dialog open className='modal'>
      <div className='modal-box relative flex items-center justify-center h-130 w-90'>
        <button
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary bg-neutral'
          onClick={onClose}
        >
          ✕
        </button>

        <div>
          <h2 className='card-title text-sm text-center mb-2 justify-center'>
            {title}
          </h2>
          <img src={imageUrl} alt={title} className='object-contain' />
        </div>
      </div>
    </dialog>
  );
};

export default ImageModal;
