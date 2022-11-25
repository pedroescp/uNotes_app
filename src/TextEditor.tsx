import { useCallback, useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { io } from 'socket.io-client';
import { Bookmark } from './images/icons/icons';

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

    const handler = (delta: any) => {
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

    const handler = (delta: any, oldDelta: any, source: any) => {
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
    const s = io('wss://localhost:8080');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  //configure the lib and the wrapper the content in
  const wrapperRef = useCallback((wrapper: any) => {
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
          defaultValue={note?.title}
          className='input input-ghost w-full bg-transparent focus:outline-none'
        />
        <div className='mr-5'>
          <Bookmark />
        </div>
      </div>
      <div className='container' id='container' ref={wrapperRef}></div>
    </>
  );
}

export default TextEditor;
