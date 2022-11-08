import { useNavigate } from 'react-router-dom';
import { Base } from './baseComponent';

export function HomePage() {
	const navigate = useNavigate();

	return (
		<div className='flex justify-center h-[calc(100vh_-_80px)] lg:h-screen'>
			<div className='container px-4'>
				<div className='flex flex-col md:flex-row justify-center items-center h-full gap-4 py-4'>
					<div
						onClick={() => navigate('/note')}
						className='card max-w-md max-h-96 w-full h-full border-primary transition-all hover:shadow-[inset_0px_0px_25px_5px_rgb(0_160_196_/_0.3)] active:shadow-[inset_0px_0px_25px_5px_rgb(0_160_196_/_0.3)] border-2 text-primary'
					>
						<span className='grid place-items-center h-full text-center transition-all text-3xl hover:scale-125 active:scale-125 select-none cursor-pointer'>
							Notas
						</span>
					</div>

					<div className='card max-w-md max-h-96 w-full h-full border-primary transition-all hover:shadow-[inset_0px_0px_25px_5px_rgb(0_160_196_/_0.3)] active:shadow-[inset_0px_0px_25px_5px_rgb(0_160_196_/_0.3)] border-2 text-primary'>
						<span className='grid place-items-center h-full text-center transition-all text-3xl hover:scale-125 active:scale-125 select-none cursor-pointer'>
							Documentos
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
