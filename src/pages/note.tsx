import { Base } from '../components/baseComponent';
import { ExitSiteMesssage } from '../components/exitSite';
import Notes from '../components/modal';
import {
	ArchiveIcon,
	ExitMarkIcon,
	HamburgerIcon,
	LogoutIcon,
	TrashIcon,
	UserIcon,
} from '../icons/icons';

function Note() {
	return (
		<Base>
			<div className='drawer'>
				<input
					id='menu-lateral'
					type='checkbox'
					className='drawer-toggle'
				/>
				<div className='drawer-content flex flex-col p-4'>
					<div className='bg-base-200 p-1 rounded-full'>
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
						</div>
					</div>
				</div>
				<div className='drawer-side'>
					<label
						htmlFor='menu-lateral'
						className='drawer-overlay'
					></label>
					<ul className='menu p-4 w-80 bg-base-100 text-base-content'>
						<li className='items-end mb-10'>
							<label htmlFor='menu-lateral'>
								<a>
									<ExitMarkIcon />
								</a>
							</label>
						</li>
						<li>
							<a>
								<ArchiveIcon />
								Arquivo
							</a>
						</li>
						<li>
							<a>
								<TrashIcon />
								Lixeira
							</a>
						</li>
						<li className='mt-auto'>
							<a
								className='dropdown dropdown-top z-50 active:!bg-[#c2d0ea1a] active:text-[#c2d0ea]'
								tabIndex={0}
							>
								<div className='avatar'>
									<div className='w-8 rounded-full'>
										<img src='https://placeimg.com/192/192/people' />
									</div>
								</div>
								<span className='text-start'>
									<span className='text-lg'>Rafael</span>
									<p className='text-xs capitalize'>
										Desenvolvedor
									</p>
								</span>
								<ul
									tabIndex={0}
									className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52 lg:mt-52'
								>
									<li>
										<a>
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
				</div>
				<Notes />
				<ExitSiteMesssage htmlFor='exit-site' />
			</div>
		</Base>
	);
}

export default Note;
