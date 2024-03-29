import { createRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { ArchiveIconQuill, Bookmark, TrashIconQuill } from './images/icons/icons';
import api from './utils/api';
import './styles/estiloNotas.css';
var icons = Quill.import('ui/icons');

icons['delete'] = TrashIconQuill();
icons['archive'] = ArchiveIconQuill();

interface Parameters {
  note: any;
}

const TextEditor = forwardRef(({ note }: Parameters, ref) => {
  const [quill, setQuill] = useState();

  const inputTitleRef = createRef();

  const getInputTitleRef = () => inputTitleRef.current;
  const archive = (note: any[]) => (note ? [{ delete: 'delete' }, { archive: 'archive' }] : []);

  // OPTIONS
  const TOOLBAR_OPTIONS = {
    container: [['bold', 'italic', 'underline'], [{ list: 'check' }], archive(note)],
    handlers: {
      delete: () => {
        api.trashPost(note.id);
      },

      archive: () => {
        api.archivePost(note.id);
      },
    },
  };

  //configure the lib and the wrapper the content in
  const wrapperRef = useCallback((wrapper: any) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
      placeholder: 'Escrever uma nota',
    });
    if (note && note.texto) q.setText(note?.texto);
    setQuill(q);
  }, []);

  function convertHtmlToDelta(html) {
    const tempEditor = new Quill(document.createElement('div'));
    tempEditor.clipboard.dangerouslyPasteHTML(html);
    const delta = tempEditor.getContents();
    return delta;
  }

  function convertDeltaToHtml(delta) {
    const tempEditor = new Quill(document.createElement('div'));
    tempEditor.setContents(delta);
    const html = tempEditor.root.innerHTML;
    return html;
  }

  const getValue = () => {
    if (quill) {
      const delta = convertDeltaToHtml((quill as Quill).getContents());
      return {
        title: (getInputTitleRef() as any).value,
        text: (quill as Quill).getText(),
      };
    }

    return null;
  };

  useImperativeHandle(ref, () => ({
    getValue,
  }));

  return (
    <>
      <div className='flex justify-between items-center pt-5 title-note mb-8'>
        <input
          ref={inputTitleRef}
          type='text'
          placeholder='Titulo'
          maxLength={30}
          defaultValue={note?.titulo}
          className='input input-ghost w-full bg-transparent focus:outline-none'
        />
        <div className='mr-5'>
          <Bookmark />
        </div>
      </div>
      <div className='container' id='container' ref={wrapperRef}></div>
    </>
  );
});

export default TextEditor;
