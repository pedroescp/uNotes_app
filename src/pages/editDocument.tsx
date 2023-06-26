import { useNavigate, useParams } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { Fragment, useEffect, useRef, useState } from 'react';
import documentoService from '../utils/documentosService';
import { ArrowBack, LoadingIcon, LogoutIcon, TrashIcon, UserIcon } from '../images/icons/icons';
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
import api from '../utils/api';
import usuarioSerivce from '../utils/usuarioService';
import { einstein } from '../images/base64/profileMokup';
import { Transition, Dialog } from '@headlessui/react';
//import '../styles/toastUI.css';

export default function EditDocumento() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [usuario, setUsuario] = useState();
  const [showEmpty, setShowEmpty] = useState(false);
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
    getNotes();
    getUsuario();
  }, []);

  async function getUsuario() {
    const response = await usuarioSerivce.getUsuarioLogado();
    if (!response.data?.avatar) {
      response.data.avatar = einstein();
    }
    setUsuario(response.data);
  }

  async function getNotes() {
    try {
      const res = await api.notesGet();
      setNotes(res.data);

      if (!res.data || res.data.length <= 0) setShowEmpty(true);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao buscar notas relacionadas ao documento', {
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
      toast.error('Erro ao carregar a documento', {
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

  async function redirectToNotes() {
    await atualizarNota();
    navigate(`/note`);
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
    const [activeButton, setActiveButton] = useState('Notas');
    const [showModalDeletar, setShowModalDeletar] = useState(false);
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
      if (buttonName === 'Arquivos') {
        toast.info('Arquivos ainda está em desenvolvimento', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        return;
      }
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

    function ModalDeletarDocumento() {
      const cancelButtonRef = useRef(null);
      const closeModal = () => {
        setShowModalDeletar(false);
      };

      const deleteDocument = async () => {
        try {
          setLoading(true);
          //await documentoService.deleteDocumento(id as string);
          setLoading(false);
          voltar();
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          setShowModalDeletar(false);
        }
      };

      return (
        <Transition.Root show={showModalDeletar} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-10'
            initialFocus={cancelButtonRef}
            onClose={closeModal}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
            </Transition.Child>

            <div className='fixed h-fit m-auto flex inset-0 z-10 overflow-y-auto px-4'>
              <div className='grid place-items-center w-full'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                  enterTo='opacity-100 translate-y-0 sm:scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                  leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                >
                  <Dialog.Panel className='p-4 w-96 rounded-lg bg-slate-700 shadow-xl transition-all h-full'>
                    <h3 className='text-lg font-bold pb-2'>Deseja excluir esse documento?</h3>
                    <p className='text-sm text-error pb-4'>
                      <b>Atenção: </b>
                      Essa ação não poderá ser revertida!
                    </p>
                    <div className='flex justify-between gap-2'>
                      <button type='button' onClick={closeModal} className='btn gap-2 btn-ghost'>
                        Cancelar
                      </button>
                      <button
                        onClick={() => deleteDocument()}
                        disabled={loading}
                        type='submit'
                        className='btn btn-error'
                      >
                        {loading ? (
                          <>
                            <LoadingIcon />
                            Excluindo
                          </>
                        ) : (
                          <>Exluir</>
                        )}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      );
    }

    return (
      <>
        <div className='navbar bg-base-100'>
          <div className='navbar-start gap-2'>
            <a
              data-tip='Salvar e voltar'
              onClick={() => voltar()}
              className='flex btn btn-ghost normal-case text-lg gap-4 tooltip tooltip-right tooltip-index'
            >
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
          <div className='navbar-end gap-4'>
            <label
              onClick={() => setShowModalDeletar(true)}
              className='btn btn-ghost btn-circle avatar'
            >
              <TrashIcon />
            </label>
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img src={(usuario as any)?.avatar} />
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
          <div className='min-w-[300px] bg-base-200 p-4 flex flex-col gap-4'>
            <div className='btn-group'>
              <button
                className={`btn ${activeButton === 'Arquivos' ? 'btn-active' : ''} w-1/2`}
                onClick={() => handleClick('Arquivos')}
              >
                Arquivos
              </button>
              <button
                className={`btn ${activeButton === 'Notas' ? 'btn-active' : ''} w-1/2`}
                onClick={() => handleClick('Notas')}
              >
                Notas
              </button>
            </div>

            <div className='grid gap-2 overflow-x-auto'>
              {showEmpty && (
                <div className='text-center text-balance'>
                  <p>Parece que você ainda não criou notas...</p>
                  <a onClick={() => redirectToNotes()} className='text-sm link text-secondary'>
                    Clique aqui para criar uma nota!
                  </a>
                </div>
              )}
              {!showEmpty &&
                notes.map((note: any) => (
                  <div className='card-glass p-2'>
                    <h1>{note.titulo}</h1>
                    <p>{note.texto}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className='flex justify-center p-4 w-full'>
            <div className='bg-white w-[794px]' ref={textRef} />
            <ToastContainer />
          </div>
        </div>

        <ExitSiteMesssage htmlFor='logout' />
        <ModalDeletarDocumento />
      </>
    );
  }

  function EditDocument() {
    return width < 600 ? <MobileVersion /> : <DesktopVersion />;
  }

  return <EditDocument />;
}
