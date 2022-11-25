import { useCallback, useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { io } from 'socket.io-client';

//header of the lib
const TOOLBAR_OPTIONS = [
  /* [{ header: [1, 2, 3, 4, 5, 6, false] }], */
  /* [{ font: [] }], */
  /* ["bold", "italic", "underline"], */
  /* [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], */
  /* [{ color: [] }, { background: [] }], */
  /* ["code-block"], */
];

interface Parameters {
  note: any;
}

function TextEditor({ note }: Parameters) {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  //receive the socket in another location and write in
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  //send request to socket
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  //the connection
  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  //configure the lib and the wrapper the content in
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      /*       theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS }, */
      placeholder: 'Escrever uma nota',
    });
    if (note && note.description) q.setText(note?.description);
    setQuill(q);
  }, []);

  return (
    <>
      <div className='flex justify-between items-center pt-5 mb-0.5 title-note'>
        <input
          type='text'
          placeholder='Titulo'
          maxLength={30}
          value={note?.title}
          className='input input-ghost w-full bg-transparent focus:outline-none'
        />
        <label className='swap'>
          <input type='checkbox' />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='swap-on w-8 h-6 mr-5 '
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='swap-off w-8 h-6 mr-5'
          >
            <path
              fill-rule='evenodd'
              d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z'
              clip-rule='evenodd'
            />
          </svg>
        </label>
      </div>
      <div className='container' id='container' ref={wrapperRef}></div>
    </>
  );
}

export default TextEditor;
