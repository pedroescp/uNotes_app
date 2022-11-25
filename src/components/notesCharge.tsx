import { useEffect, useState } from 'react';
import { Fixed } from '../images/icons/icons';
import api from '../utils/api';

export async function NotesCharges() {
    const [notes, setNotes] = useState({ data: [] })
    async function getNotes() {
        return await api.notesGet()
    }
    const listNotes = await getNotes();
    await setNotes(listNotes.data.map((data: { titulo: string, texto: string}) => {
        return data;
    }))
    console.log(listNotes.data[0])
  return (
    <div className='m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center mt-20 '>
        {listNotes.data[0].map((note: any) => (
          <div key={note.id} id={note.id} className='w-full h-fit'>
            <div className='card bg-secondary text-primary-content cursor-pointer h-full '>
              <div className='card-body p-4'>
                <h2 className='card-title px-2 justify-between'>
                  {note.titulo}

                  <Fixed />
                </h2>

                <p>
                  <div
                    className='ql-editor p-0 card_preview-text h-full'
                    data-gramm='false'
                    data-placeholder='Escrever uma nota'
                  >
                    {note.documentoId}
                  </div>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
