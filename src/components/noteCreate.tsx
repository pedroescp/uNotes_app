import { useRef, useState } from 'react';
import { Plus } from '../images/icons/icons';
import api from '../utils/api';
import { NotesModal } from './notesModal';

interface Parameters {
  onClose?: () => void;
}

export default function Notes({ onClose }: Parameters) {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const openButtonRef = () => {
    setOpen(!open);
  };

  const handleOnNotesModalClose = async ({ title, text }: any) => {
    if (!title || !text) {
      return;
    }

    await api.notesPost({
      titulo: title,
      texto: text,
      criadorId: null,
      usuarioAtualizacaoId: null,
      documentoId: null,
    });
    !!onClose && onClose();
  };

  return (
    <div className='h-full w-full'>
      <div className=' mt-10'>
        <button
          className='btn btn-active btn-primary fixed right-6 bottom-6 h-14 w-14  rounded-full md:max-xl:bottom-56'
          onClick={() => openButtonRef()}
        >
          <Plus />
        </button>
      </div>
      <NotesModal
        open={open}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
        onClose={handleOnNotesModalClose}
      />
    </div>
  );
}
