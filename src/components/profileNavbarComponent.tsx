import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { LogoutIcon, UserIcon } from '../images/icons/icons';
import { ExitSiteMesssage } from './exitSite';

interface LayoutProps {
  children?: ReactNode;
}

export function ProfileNavbar({ children }: LayoutProps) {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  function classes(): string {
    return width < 1024
      ? 'btn bg-base-300 border-base-300 shadow-lg fixed flex justify-between bottom-0 w-full h-20 dropdown dropdown-top z-10'
      : 'fixed flex items-center rounded-2xl dropdown h-20 px-8 bg-base-300 dropdown z-2 mt-4 mr-4 right-0 dropdown-end z-10';
  }

  return (
    <>
      <div className={classes()} tabIndex={0}>
        <div className='flex gap-2 cursor-pointer'>
          <label className='btn btn-ghost btn-circle avatar online'>
            <div className='w-10 rounded-full'>
              <img src='https://placeimg.com/80/80/people' />
            </div>
          </label>
          <span className='text-start '>
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
