import { useNavigate, useParams } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import documentoService from '../utils/documentosService';
import { ArrowBack, LogoutIcon, UserIcon } from '../images/icons/icons';
import { ExitSiteMesssage } from '../components/exitSite';

export default function EditDocumento() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
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
    } finally {
      setLoading(false);
    }
  }

  function voltar() {
    navigate(`/document/`);
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

    const handleClick = (buttonName: string) => {
      setActiveButton(buttonName);
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
          <div className='navbar-center'>Quil.js options</div>
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
          <div className='flex justify-center pt-4 w-full'></div>
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
