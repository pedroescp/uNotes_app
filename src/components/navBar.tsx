import {
  ArchiveIcon,
  ArrowBack,
  ExitMarkIcon,
  HamburgerIcon,
  LogoutIcon,
  NoteIcon,
  SearchIcon,
  TrashIcon,
  UserIcon,
} from '../images/icons/icons';
import { useNavigate } from 'react-router-dom';
import { ExitSiteMesssage } from './exitSite';
import useWindowDimensions from '../hooks/useWindowDimensions';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const NavBar = ({ children }: Props) => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  function classes(): string {
    return width < 1024
      ? 'hidden'
      : 'fixed flex items-center rounded-2xl dropdown h-20 px-8 bg-base-300 dropdown z-2 mt-4 mr-4 right-0 dropdown-end z-10';
  }

  function ProfileComponent() {
    return (
      <>
        <div className={classes()} tabIndex={0}>
          <div className='flex gap-2 cursor-pointer'>
            <label className='btn btn-ghost btn-circle avatar online'>
              <div className='w-10 rounded-full'>
                <img src='https://placeimg.com/80/80/people' />
              </div>
            </label>
            <span className='text-start'>
              <span className='text-lg'>{String(JSON.parse(localStorage.getItem('user')).user)}</span>
              <p className='text-xs capitalize'>Desenvolvedor</p>
            </span>
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52 lg:mt-52'
          >
            <li>
              <a onClick={() => navigate('/profile')}>
                <UserIcon />
                Perfil
              </a>
            </li>
            <li>
              <label htmlFor='exit-site'>
                <LogoutIcon />
                Sair
              </label>
            </li>
          </ul>
        </div>

        <ExitSiteMesssage htmlFor='exit-site' />
      </>
    );
  }

  function SearchComponent() {
    return (
      <div className='bg-base-200 w-full mx-auto sm:w-96 md:w-3/4 lg:w-1/2 p-1 rounded-full'>
        <div className='flex gap-2'>
          <label
            htmlFor='menu-lateral'
            className='btn rounded-full p-0 w-full max-w-[3rem] h-auto max-h-12 min-h-0 drawer-button'
          >
            <HamburgerIcon />
          </label>
          <input
            type='text'
            placeholder='Toque para filtrar notas'
            className='input input-sm px-2 w-full rounded-full bg-base-200 transition-all focus:input-md focus:bg-base-100 focus:outline-none active:outline-none active:outline-0'
          />
          <button className='btn rounded-full p-0 w-full max-w-[3rem] h-auto max-h-12 min-h-0 drawer-button hidden sm:flex'>
            <SearchIcon />
          </button>
        </div>
      </div>
    );
  }

  function DrawerComponent() {
    return (
      <>
        <label htmlFor='menu-lateral' className='drawer-overlay'></label>
        <ul className='menu p-4 w-80 bg-base-200 text-base-content'>
          <li className='items-end mb-10'>
            <label htmlFor='menu-lateral'>
              <a>
                <ExitMarkIcon />
              </a>
            </label>
          </li>
          <li>
            <a onClick={() => navigate('/home')}>
              <ArrowBack />
              Home
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/note')}>
              <NoteIcon />
              Notas
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/archive')}>
              <ArchiveIcon />
              Arquivo
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/trash')}>
              <TrashIcon />
              Lixeira
            </a>
          </li>
          <li className='mt-auto'>
            <a
              className='dropdown dropdown-top z-50 active:!bg-[#c2d0ea1a] active:text-[#c2d0ea]'
              tabIndex={0}
            >
              <div className='avatar online'>
                <div className='w-8 rounded-full'>
                  <img src='https://placeimg.com/192/192/people' />
                </div>
              </div>
              <span className='text-start'>
                <span className='text-lg'>{String(JSON.parse(localStorage.getItem('user')).user)}</span>
                <p className='text-xs capitalize'>Desenvolvedor</p>
              </span>
              <ul
                tabIndex={0}
                className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52 lg:mt-52'
              >
                <li>
                  <a onClick={() => navigate('/profile')}>
                    <UserIcon />
                    Perfil
                  </a>
                </li>
                <li>
                  <label htmlFor='exit-site'>
                    <a className='flex items-center gap-3'>
                      <LogoutIcon />
                      Sair
                    </a>
                  </label>
                </li>
              </ul>
            </a>
          </li>
        </ul>
      </>
    );
  }

  return (
    <>
      {ProfileComponent()}
      <div className='drawer'>
        <input id='menu-lateral' type='checkbox' className='drawer-toggle' />

        <div className='drawer-content flex flex-col p-4 xl:items-center'>
          {SearchComponent()}
          {/* Conteúdo da página */ children}
        </div>
        <div className='drawer-side'>{DrawerComponent()}</div>
      </div>
    </>
  );
};

export default NavBar;
