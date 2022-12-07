import { useState, useRef, useEffect } from 'react';
import { Bookmark } from '../images/icons/icons';
import { NotesModal } from './notesModal';
import NotesFAB from '../components/noteCreate';
import api from '../utils/api';

interface Parameters {
  type: string;
}

export function NotesCharges({ type }: Parameters) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [note, setOnlyNote] = useState([]);

  useEffect(() => {
    async function getNotes() {
      //make a filter
      const response = await api.notesGet();
      setNotes(response.data);
    }
    getNotes();
  }, []);

  const openButtonRef = (note: any) => {
    setOnlyNote(note);
    setOpen(true);
  };

  const handleOnNotesModalClose = async ({ title, text }: any) => {
    setOpen(false);

    await api.notesUpdate({
      id: note['id'],
      titulo: title,
      texto: text,
    });

    const newNotes = await api.notesGet();
    setNotes(newNotes.data);
  };

  const handleOnNotesCreate = async () => {
    setOpen(false);
    const newNotes = await api.notesGet();
    setNotes(newNotes.data);
  };

  return (
    <>
      <div data-aos='zoom-out' data-aos-anchor-placement='top-center' className='mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center mt-20 '>
          {notes.map((note: any) => (
            <div
              onClick={() => openButtonRef(note)}
              key={note.id}
              id={note.id}
              className='w-full h-fit'
            >
              <div className='card bg-secondary text-primary-content cursor-pointer h-full'>
                <div className='card-body p-4'>
                  <div className='flex'>
                    <h2 className='card-title pl-2 justify-between w-[90%] break-all'>
                      {note.titulo}
                    </h2>
                    <span className='px-2'>
                      <Bookmark />
                    </span>
                  </div>

                  <p>
                    <div
                      className='ql-editor p-0 card_preview-text h-full'
                      data-gramm='false'
                      data-placeholder='Escrever uma nota'
                    >
                      {note.texto}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <NotesModal
          open={open}
          cancelButtonRef={cancelButtonRef}
          setOpen={setOpen}
          note={note}
          onClose={handleOnNotesModalClose}
        />
      </div>
      <NotesFAB onClose={handleOnNotesCreate} />
    </>
  );
}
