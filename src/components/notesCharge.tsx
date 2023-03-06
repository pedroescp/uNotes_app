import { useState, useRef, useEffect } from 'react';
import { Bookmark } from '../images/icons/icons';
import { NotesModal } from './notesModal';
import NotesFAB from '../components/noteCreate';
import api from '../utils/api';
import { SkeletonNotes } from './skeletonNotes';
import { Empty } from './Empty';

interface Parameters {
  type: string;
}

export function NotesCharges({ type }: Parameters) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [note, setOnlyNote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    async function getNotes() {
      //make a filter
      const response = await api.notesGet();
      setNotes(response.data);
      if (response.data == '') {
        setShowEmpty(true);
      }
      
      setLoading(false);
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
    if(newNotes.data == "") {
      setShowEmpty(true);    
    }
    
  };

  const handleOnNotesCreate = async () => {
    setOpen(false);
    const newNotes = await api.notesGet();
    setNotes(newNotes.data);
    setShowEmpty(false);      
  };


  return (
    <>
      <div
        data-aos='zoom-out'
        data-aos-anchor-placement='top-center'
        className='mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl'
      >
        <div className={`mt-20 ${showEmpty ? 'flex justify-center items-center flex-direction-column' : 'columns-2 md:columns-3 lg:columns-4'}`} >
          {loading && <SkeletonNotes />}
          {showEmpty && <Empty />}
          {!loading &&
            notes.map((note: any) => (
              <div
                onClick={() => openButtonRef(note)}
                key={note.id}
                id={note.id}
                className='w-full h-fit'
              >
                <div className='card card-glass  cursor-pointer relative mb-4'>
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
