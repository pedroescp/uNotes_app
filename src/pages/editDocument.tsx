import { useNavigate, useParams } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useEffect, useRef, useState } from 'react';
import documentoService from '../utils/documentosService';
import { ArrowBack, LogoutIcon, UserIcon } from '../images/icons/icons';
import { ExitSiteMesssage } from '../components/exitSite';
import Editor, { EditorOptions } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '../styles/toastUI.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fa1,
  fa2,
  fa3,
  faBold,
  faCode,
  faHeading,
  faItalic,
  faListUl,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditDocumento() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const [documento, setDocumento] = useState({
    id: '',
    categoriaId: '',
    texto: '',
    titulo: '',
    notas: [],
  });

  useEffect(() => {
    getID();
  }, []);

  async function getID() {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      const res = await documentoService.obterDocumentoPorID(id || '');
      setDocumento(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar a nota', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } finally {
      setLoading(false);
    }
  }

  async function voltar() {
    if (loading) {
      return;
    }
    const res = await atualizarNota();
    if (res) navigate(`/document`);
  }

  async function atualizarNota() {
    try {
      setLoading(true);
      const obj = {
        id: id,
        titulo: documento.titulo,
        texto: editorRef.current?.getMarkdown(),
      };
      await documentoService.updateDocumento(obj);
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar a nota', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }

  /* Readonly for mobile */
  function MobileVersion() {
    return (
      <>
        <div className='navbar bg-base-100'>
          <div className='flex-1'>
            <a onClick={() => voltar()} className='btn btn-ghost normal-case text-lg gap-4'>
              <ArrowBack />
            </a>
          </div>
          <div
            className='flex-none px-4 text-xl tooltip tooltip-bottom tooltip-size'
            data-tip={documento.titulo}
          >
            {documento.titulo.length > 20
              ? documento.titulo.slice(0, 20) + '...'
              : documento.titulo}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: documento.texto }}></div>
      </>
    );
  }

  function DesktopVersion() {
    const [activeButton, setActiveButton] = useState('Arquivos');
    const optionsRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (textRef.current) {
        const editorOptions: EditorOptions = {
          el: textRef.current,
          initialEditType: 'markdown',
          initialValue: documento.texto || ' ',
          previewStyle: 'tab',
          toolbarItems: [],
          height: 'calc(100vh - 98.5px)',
          hideModeSwitch: true,
          placeholder: 'Escrever um documento',
        };

        editorRef.current = new Editor(editorOptions);
      }
    }, []);

    const handleClick = (buttonName: string) => {
      setActiveButton(buttonName);
    };

    const handleBoldClick = () => {
      if (editorRef.current) {
        const selection = editorRef.current.getSelectedText();
        editorRef.current.replaceSelection(`**${selection}**`);
      }
    };

    const handleItalicClick = () => {
      if (editorRef.current) {
        const selection = editorRef.current.getSelectedText();
        editorRef.current.replaceSelection(`*${selection}*`);
      }
    };

    const handleHeadingClick = (level: number) => {
      if (editorRef.current) {
        const selection = editorRef.current.getSelectedText();
        const heading = '#'.repeat(level) + ' ';
        editorRef.current.replaceSelection(`${heading}${selection}`);
      }
    };

    const handleCodeClick = () => {
      if (editorRef.current) {
        const selection = editorRef.current.getSelectedText();
        editorRef.current.replaceSelection(`\`${selection}\``);
      }
    };

    const handleQuoteClick = () => {
      if (editorRef.current) {
        const selection = editorRef.current.getSelectedText();
        editorRef.current.replaceSelection(`> ${selection}`);
      }
    };

    const handleListClick = () => {
      if (editorRef.current) {
        const selection = editorRef.current.getSelectedText();
        const lines = selection.split('\n');
        const listItems = lines.map((line: any) => `* ${line}`);
        editorRef.current.replaceSelection(listItems.join('\n'));
      }
    };

    return (
      <>
        <div className='navbar bg-base-100'>
          <div className='navbar-start gap-2'>
            <a onClick={() => voltar()} className='btn btn-ghost normal-case text-lg gap-4'>
              <ArrowBack />
            </a>
            <span
              className='text-xl tooltip tooltip-bottom tooltip-size'
              data-tip={documento.titulo}
            >
              {documento.titulo.length > 20
                ? documento.titulo.slice(0, 20) + '...'
                : documento.titulo}
            </span>
          </div>
          <div className='navbar-center'>
            <div className='flex gap-4' ref={optionsRef}>
              <button onClick={() => handleHeadingClick(1)}>
                <FontAwesomeIcon icon={faHeading} />
                <FontAwesomeIcon icon={fa1} />
              </button>
              <button onClick={() => handleHeadingClick(2)}>
                <FontAwesomeIcon icon={faHeading} />
                <FontAwesomeIcon icon={fa2} />
              </button>
              <button onClick={() => handleHeadingClick(3)}>
                <FontAwesomeIcon icon={faHeading} />
                <FontAwesomeIcon icon={fa3} />
              </button>
              <button onClick={handleBoldClick}>
                <FontAwesomeIcon icon={faBold} />
              </button>
              <button onClick={handleItalicClick}>
                <FontAwesomeIcon icon={faItalic} />
              </button>
              <button onClick={handleCodeClick}>
                <FontAwesomeIcon icon={faCode} />
              </button>
              <button onClick={handleQuoteClick}>
                <FontAwesomeIcon icon={faQuoteRight} />
              </button>
              <button onClick={handleListClick}>
                <FontAwesomeIcon icon={faListUl} />
              </button>
            </div>
          </div>
          <div className='navbar-end'>
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img src='https://cdn.discordapp.com/attachments/1097473495425884200/1106562995062055053/einstein.png' />
                </div>
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
              >
                <li>
                  <a onClick={() => navigate('/profile')}>
                    <UserIcon />
                    Perfil
                  </a>
                </li>
                <li>
                  <label htmlFor='logout'>
                    <LogoutIcon />
                    Sair
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='flex h-[calc(100%_-_66.6px)]'>
          <div className='menu-lateral bg-base-200 p-4 flex flex-col gap-4'>
            <div className='btn-group'>
              <button
                className={`btn ${activeButton === 'Arquivos' ? 'btn-active' : ''} w-32`}
                onClick={() => handleClick('Arquivos')}
              >
                Arquivos
              </button>
              <button
                className={`btn ${activeButton === 'Notas' ? 'btn-active' : ''} w-32`}
                onClick={() => handleClick('Notas')}
              >
                Notas
              </button>
            </div>

            <div className='pt-4'>
              <div className='card'>teste</div>
            </div>
          </div>
          <div className='flex justify-center p-4 w-full'>
            <div className='bg-white w-[794px]' ref={textRef} />
            <ToastContainer />
          </div>
        </div>

        <ExitSiteMesssage htmlFor='logout' />
      </>
    );
  }

  function EditDocument() {
    return width < 600 ? <MobileVersion /> : <DesktopVersion />;
  }

  return <EditDocument />;
}
