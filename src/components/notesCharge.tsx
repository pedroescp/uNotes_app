import { Fixed } from '../images/icons/icons';

const notes = [
  {
    id: 1,
    title: 'Bob Jones',
    description: 'Javascript',
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
  return (
    <div className='m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center mt-20 '>
        {notes.map((note: any) => (
          <div key={note.id} id={note.id} className='w-full'>
            <div className='card bg-secondary text-primary-content cursor-pointer h-full '>
              <div className='card-body p-4'>
                <h2 className='card-title px-2 justify-between'>
                  {note.title}

                  <Fixed />
                </h2>

                <p>
                  <div
                    className='ql-editor p-0 card_preview-text h-full'
                    data-gramm='false'
                    data-placeholder='Escrever uma nota'
                  >
                    {note.description}
                    {note.description}
                    {note.description}
                    {note.description}
                    {note.description}
                    {note.description}
                    {note.description}
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
