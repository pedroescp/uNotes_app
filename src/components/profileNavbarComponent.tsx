import { ReactNode } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';

interface LayoutProps {
	children?: ReactNode;
}

export function ProfileNavbar({ children }: LayoutProps) {
	const { height, width } = useWindowDimensions();

	function classes(): string {
		return width < 1024
			? 'btn bg-base-300 border-base-300 shadow-lg fixed flex justify-between bottom-0 w-full h-20 dropdown dropdown-top z-50'
			: 'fixed flex items-center rounded-2xl dropdown h-20 px-8 bg-base-300 dropdown z-50 mt-4 mr-4 right-0 dropdown-end';
	}

	return (
		<>
			<div className={classes()} tabIndex={0}>
				<div className='flex gap-2'>
					<label className='btn btn-ghost btn-circle avatar'>
						<div className='w-10 rounded-full'>
							<img src='https://placeimg.com/80/80/people' />
						</div>
					</label>
					<span className='text-start'>
						<span className='text-lg'>Rafael</span>
						<p className='text-xs capitalize'>Desenvolvedor</p>
					</span>
				</div>
				<ul
					tabIndex={0}
					className='menu dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52 lg:mt-52'
				>
					<li>
						<a>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
								/>
							</svg>
							Perfil
						</a>
					</li>
					<li>
						<a>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
								/>
							</svg>
							Sair
						</a>
					</li>
				</ul>
			</div>
		</>
	);
}
