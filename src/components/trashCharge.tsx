import { useState, useRef, useEffect } from 'react';
import { Bookmark } from '../images/icons/icons';
import { NotesModal } from './notesModal';
import api from '../utils/api';
import { SkeletonNotes } from './skeletonNotes';

interface Parameters {
  type: string;
}

export function TrashCharges({ type }: Parameters) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [notes, setTrash] = useState([]);
  const [note, setOnlyNote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTrash() {
      //make a filter
      const response = await api.trashGet();
      setTrash(response.data);
      setLoading(false)
    }
    getTrash();
  }, []);

  const openButtonRef = (note: any) => {
    setOnlyNote(note);
    setOpen(!open);
  };

  return (
    <div
      data-aos='zoom-out'
      data-aos-anchor-placement='top-center'
      className='mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl'
    >
      <div className='columns-2 md:columns-3 lg:columns-4 mt-20'>
      {loading && <SkeletonNotes />}
          {!loading &&notes.map((note: any) => (
          <div
            onClick={() => openButtonRef(note)}
            key={note.id}
            id={note.id}
            className='w-full h-fit'
          >
            <div className='card bg-secondary text-primary-content cursor-pointer relative mb-4'>
              <div className='card-body p-4'>
                <div className='flex'>
                  <h2 className='card-title pl-2 justify-between w-[90%] break-all'>
                    {note.titulo}
                  </h2>
                  <span className='px-2'>
                    <Bookmark
                      key={note.bookmark}
                      onClick={console.warn('PEDRO PARA DE COMMITAR COM CONSOLE.LOGKKKKKKK')}
                    />
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
      <NotesModal open={open} cancelButtonRef={cancelButtonRef} setOpen={setOpen} note={note} />
    </div>
  );
}
