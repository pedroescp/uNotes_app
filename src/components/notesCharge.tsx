import { Fixed, Plus } from "../images/icons/icons";

const notes = [
  {
    id: 1,
    title: "Bob Jones",
    description: "Javascript",
  },
  {
    id: 12,
    title: "Bob Jasdasdones",
    description: "Javascript",
  },
  {
    id: 3,
    title: "Bobasdasdas Jones",
    description: "Javascrasdasdadaipt",
  },
  {
    id: 4,
    title: "sdasdasdasdasds",
    description: "Javascriasdasdasdasdasdpt",
  },
  {
    id: 6,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 7,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
];

export default function NotesCharges() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 xl:grid-cols-4 2xl:grid-cols-5 gap-10 justify-items-center mt-20 ">
        {notes.map((note: any) => (
          <div key={note.id} id={note.id} className=" w-full h-full">
            <div className="card bg-secondary text-primary-content cursor-pointer h-full ">
              <div className="card-body p-4">
                <h2 className="card-title px-2 justify-between">
                  {note.title}

                  <Fixed />
                </h2>

                <p>
                  <div
                    className="ql-editor p-0 card_preview-text h-full"
                    data-gramm="false"
                    data-placeholder="Escrever uma nota"
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
    </>
  );
}
