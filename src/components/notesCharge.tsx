import { useState, useRef } from 'react';
import { Bookmark } from '../images/icons/icons';
import { NotesModal } from './notesModal';

const notes = [
  {
    id: 1,
    title: 'Bob Jones',
    description: '<p>dfsdfsdf</p><p>dfsdfsdf</p><p>dfsdfsdf</p><p>dfsdfsdf</p>',
  },
  {
    id: 12,
    title: 'Bob Jasdasdones',
    description: 'Javascript',
  },
  {
    id: 3,
    title: 'Bobasdasdas Jones',
    description: 'Javascrasdasdadaipt',
  },
  {
    id: 4,
    title: 'sdasdasdasdasds',
    description: 'Javascriasdasdasdasdasdpt',
  },
  {
    id: 6,
    title: 'asdasdasdasdnes',
    description: 'Javascaaaaaaaaaaaaaaaaipt',
  },
  {
    id: 7,
    title: 'asdasdasdasdnes',
    description: 'Javascaaaaaaaaaaaaaaaaipt',
  },
  {
    id: 9,
    title: 'asdasdasdasdnes',
    description: 'asaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },
  {
    id: 10,
    title: 'asdasdasdasdnes',
    description: 'Javascaaaaaaaaaaaaaaaaipt',
  },
  {
    id: 8,
    title: 'asdasdasdasdnes',
    description: 'Javascaaaaaaaaaaaaaaaaipt',
  },
];

export function NotesCharges() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [note, setNote] = useState(undefined);
  const openButtonRef = (note: any) => {
    setNote(note);
    setOpen(!open);
  };

  return (
    <div className='mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl'>
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
                    {note.title}
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
                    {note.description}
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
