import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
	const formik = useFormik({
		initialValues: {
			usuario: '',
			senha: '',
			lembrar: false,
		},
		validationSchema: Yup.object({
			usuario: Yup.string()
				.min(5, 'O usuário deve ter no mínimo 5 caracteres.')
				.max(50, 'O usuário deve ter no máximo 50 caracteres.')
				.required('Usuário não informado.'),
			senha: Yup.string()
				.min(5, 'A senha deve ter no mínimo 5 caracteres.')
				.max(50, 'A senha deve ter no máximo 50 caracteres.')
				.required('Senha não informado.'),
			lembrar: Yup.bool(),
		}),
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<div className='flex justify-center items-center h-screen bg-slate-700'>
			<div className='card w-96 bg-base-100 shadow-xl'>
				<div className='card-body items-center text-center'>
					<div className='flex flex-row gap-8'>
						<label className='swap swap-flip text-xl '>
							<input type='checkbox' defaultChecked />
							<h2
								className='swap-on tooltip tooltip-open tooltip-secondary tooltip-top mt-3'
								data-tip='Novo? Clique aqui!'
							>
								Entrar
							</h2>
							<h2 className='swap-off'>Registrar</h2>
						</label>
					</div>
					<div className='divider m-0'></div>
					<form
						onSubmit={formik.handleSubmit}
						className='form-control w-full max-w-xl'
					>
						<label htmlFor='usuario' className='label'>
							<span className='label-text'>Usuário / E-mail</span>
						</label>
						<input
							id='usuario'
							name='usuario'
							type='text'
							className='input input-bordered w-full max-w-xl'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.usuario}
						/>
						{formik.touched.usuario && formik.errors.usuario ? (
							<label className='label'>
								<span className='label-text-alt text-error'>
									{formik.errors.usuario}
								</span>
							</label>
						) : null}

						<label htmlFor='senha' className='label'>
							<span className='label-text'>Senha</span>
						</label>
						<input
							id='senha'
							name='senha'
							type='password'
							className='input input-bordered w-full max-w-xl'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.senha}
						/>
						{formik.touched.senha && formik.errors.senha ? (
							<label className='label'>
								<span className='label-text-alt text-error'>
									{formik.errors.senha}
								</span>
							</label>
						) : null}

						<div className='flex flex-col items-start mb-5 gap-2'>
							<label className='label cursor-pointer'>
								<input
									id='lembrar'
									name='lembrar'
									type='checkbox'
									className='checkbox'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<span className='label-text pl-4'>
									Lembrar-me
								</span>
							</label>
							<a className='link'>Esqueci a senha</a>
						</div>

						<div className='flex flex-col items-center'>
							<button
								type='submit'
								className='btn btn-primary btn-wide'
							>
								Entrar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
