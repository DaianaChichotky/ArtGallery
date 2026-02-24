import { MdDelete, MdSave } from 'react-icons/md';

type NoteModalProps = {
  open: boolean;
  noteValue: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
};

const NoteModal = ({
  open,
  noteValue,
  onChange,
  onSave,
  onDelete,
  onClose,
}: NoteModalProps) => {
  if (!open) return null;

  return (
    <dialog open className='modal'>
      <div className='modal-box relative'>
        <h3 className='font-bold text-lg mb-4'>Artwork Note</h3>
        <textarea
          className='textarea textarea-bordered w-full mb-4'
          value={noteValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder='Write your note...'
        />
        <div className='flex justify-end gap-2'>
          <button
            className='btn hover:bg-primary hover:text-primary-content'
            onClick={onDelete}
          >
            <MdDelete className='inline mr-1' /> Delete
          </button>
          <button
            className='btn hover:bg-primary hover:text-primary-content'
            onClick={onSave}
          >
            <MdSave className='inline mr-1' /> Save
          </button>
          <button
            className='btn btn-sm btn-circle btn-ghost absolute top-2 right-2'
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default NoteModal;
