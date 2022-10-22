import { useFormik } from 'formik';
import { HtmlHTMLAttributes } from 'react';
import * as Yup from 'yup';

interface props extends HtmlHTMLAttributes<HTMLHtmlElement> {
	aparece: boolean;
}

export function RegisterContainer(props: props) {
	const formik = useFormik({
		initialValues: {
			usuario: '',
			email: '',
			senha: '',
			repeteSenha: '',
		},
		validationSchema: Yup.object({
			usuario: Yup.string()
				.min(5, 'O usuário deve ter no mínimo 5 caracteres.')
				.max(50, 'O usuário deve ter no máximo 50 caracteres.')
				.required('Usuário não informado.'),
			nickname: Yup.string()
				.min(5, 'O nickname deve ter no mínimo 5 caracteres.')
				.max(50, 'O nickname deve ter no máximo 50 caracteres.')
				.required('Nickname não informado.'),
			email: Yup.string()
				.email('E-mail inválido')
				.required('E-mail não informado'),
			senha: Yup.string()
				.min(5, 'A senha deve ter no mínimo 5 caracteres.')
				.max(50, 'A senha deve ter no máximo 50 caracteres.')
				.required('Senha não informada.'),
			repeteSenha: Yup.string()
				.min(5, 'A senha deve ter no mínimo 5 caracteres.')
				.max(50, 'A senha deve ter no máximo 50 caracteres.')
				.required('Senha não informada.'),
		}),
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className={
				'form-control w-full max-w-xl' +
				(props.aparece ? '' : ' hidden')
			}
		>
			<label htmlFor='usuario' className='label'>
				<span className='label-text'>Usuário</span>
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
				<label className='label py-0 pr-0'>
					<span className='label-text-alt text-error'>
						{formik.errors.usuario}
					</span>
				</label>
			) : null}
			<label htmlFor='usuario' className='label'>
				<span className='label-text'>E-mail</span>
			</label>
			<input
				id='email'
				name='email'
				type='text'
				className='input input-bordered w-full max-w-xl'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.email}
			/>
			{formik.touched.email && formik.errors.email ? (
				<label className='label py-0 pr-0'>
					<span className='label-text-alt text-error'>
						{formik.errors.email}
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
				<label className='label py-0 pr-0'>
					<span className='label-text-alt text-error'>
						{formik.errors.senha}
					</span>
				</label>
			) : null}

			<label htmlFor='repeteSenha' className='label'>
				<span className='label-text'>Repita a senha</span>
			</label>
			<input
				id='repeteSenha'
				name='repeteSenha'
				type='password'
				className='input input-bordered w-full max-w-xl'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.repeteSenha}
			/>
			{formik.touched.repeteSenha && formik.errors.repeteSenha ? (
				<label className='label py-0 pr-0'>
					<span className='label-text-alt text-error'>
						{formik.errors.repeteSenha}
					</span>
				</label>
			) : null}

			<div className='flex flex-col items-center mt-5'>
				<button type='submit' className='btn btn-primary btn-wide'>
					Registrar e entrar!
				</button>
			</div>
		</form>
	);
}
