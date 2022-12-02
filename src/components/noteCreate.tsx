import { useRef, useState } from 'react';
import { Plus } from '../images/icons/icons';
import api from '../utils/api';
import { NotesModal } from './notesModal';

export default function Notes() {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const openButtonRef = () => {
    setOpen(!open);
  };

  const handleOnNotesModalClose = ({ title, text }: any) => {   
     
    api.notesPost({
      titulo: title,
      texto: text,
      criadorId: "f0f1b37b-23ec-47ad-b777-307ace3e45ae",
      usuarioAtualizacaoId: "f0f1b37b-23ec-47ad-b777-307ace3e45ae",
      documentoId: null,
    });
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
