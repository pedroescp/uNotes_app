import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contents/auth";
import { useContext } from "react";

interface LayoutProps {
	htmlFor: string;
	navigateTo?: string;
	func?: () => {};
}

export function ExitSiteMesssage({ htmlFor, navigateTo }: LayoutProps) {
	const navigate = useNavigate();
	const { logout } = useContext(AuthContext);

	return (
		<>
			<input type='checkbox' id={htmlFor} className='modal-toggle' />
			<label htmlFor={htmlFor} className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<h3 className='text-lg font-bold'>Desconectar</h3>
					<p className='py-4'>
						Voce tem certeza que deseja descontectar sua conta?
					</p>
					<div className='py-4 justify-end flex space-x-4'>
						<label htmlFor={htmlFor} className='btn btn-ghost'>
							Cancelar
						</label>
						<button
							className='btn btn-error'
							onClick={() => navigate(navigateTo || '/', logout()) }
						>
							Desconectar
						</button>
					</div>
				</label>
			</label>
		</>
	);
}
