import React from 'react';
import { Base } from '../components/baseComponent';
import Notes from '../components/modal';
import { ProfileNavbar } from '../components/profileNavbarComponent';
import {
	ConfigurationIcon,
	HamburgerIcon,
	NoteIcon,
	SearchIcon,
} from '../icons/icons';

function Note() {
	function test1() {
		return (
			<div className='p-4'>
				<div className='bg-base-200 p-1 rounded-full'>
					<div className='flex gap-2'>
						<button className='btn rounded-full p-0 w-12'>
							<HamburgerIcon />
						</button>
						<input
							type='text'
							placeholder='Toque para filtrar notas'
							className='input px-2 w-full rounded-full bg-base-200 focus:bg-base-100'
						/>
						<button className='btn rounded-full p-0 w-12'>
							<SearchIcon />
						</button>
					</div>
				</div>
			</div>
		);
	}

	function teste2() {
		return (
			<>
				<div className='flex justify-between py-3 px-5'>
					<div className='opacity-0 w-6' />
					<div className='dropdown dropdown-end'>
						<label tabIndex={0}>
							<NoteIcon />
						</label>
						<ul
							tabIndex={0}
							className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32'
						>
							<li>
								<a>Lixo</a>
							</li>
							<li>
								<a>Arquivo</a>
							</li>
						</ul>
					</div>
					<ConfigurationIcon />
				</div>
				<div className='px-5'>
					<input
						type='text'
						placeholder='Procurar anotações'
						className='input input-sm w-full rounded-full transition-all focus:input-md'
					/>
				</div>
			</>
		);
	}

	const [checkedOne, setCheckedOne] = React.useState(false);

	const handleChangeOne = () => {
		setCheckedOne(!checkedOne);
	};

	return (
		<Base>
			<div className='p-4'>
				<div className='bg-base-200 p-1 rounded-full'>
					<div className='flex gap-2'>
						<button className='btn rounded-full p-0 w-full max-w-[3rem] h-auto max-h-12 min-h-0'>
							<SearchIcon />
						</button>
						<input
							type='text'
							placeholder='Toque para filtrar notas'
							className='input input-sm px-2 w-full rounded-full bg-base-200 transition-all focus:input-md focus:bg-base-100 focus:outline-none active:outline-none active:outline-0'
						/>
					</div>
				</div>
			</div>
		</Base>
	);
}

export default Note;
