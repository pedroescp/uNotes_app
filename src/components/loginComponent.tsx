import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../utils/api';
import { AuthContext } from '../contents/auth/';
import { useContext, useState } from 'react';
import { LoadingButton } from './loadingButton';

export function LoginContainer() {
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      usuario: '',
      senha: '',
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
      setLoading(true);
      const dataResponse = {
        emailLogin: values.usuario,
        senha: values.senha,
      };
      api
        .usuarioAuth(dataResponse)
        .then((res) => {
          if (res.data) {
            login(res.data.data.nome, res.data.data.email, values.senha);
          }
        })
        .catch((err) => {
          setErrors(err.response.data.errors[0]);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='form-control w-full max-w-xl'>
      <label htmlFor='usuario' className='label'>
        <span className='label-text'>Usuário / E-mail</span>
      </label>
      <input
        id='usuario'
        name='usuario'
        type='text'
        autoComplete='off'
        className='input input-bordered w-full max-w-xl'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.usuario}
        autoFocus
      />
      {(formik.touched.usuario && formik.errors.usuario) || errors ? (
        <label className='label pb-0 pt-2 pr-0'>
          <span className='label-text-alt text-error'>{formik.errors.usuario || errors}</span>
        </label>
      ) : null}

      <label htmlFor='senha' className='label'>
        <span className='label-text'>Senha</span>
      </label>
      <input
        id='senha'
        name='senha'
        type='password'
        autoComplete='off'
        className='input input-bordered w-full max-w-xl'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.senha}
      />
      {(formik.touched.senha && formik.errors.senha) || errors ? (
        <label className='label pb-0 pt-2 pr-0'>
          <span className='label-text-alt text-error'>{formik.errors.senha || errors}</span>
        </label>
      ) : null}

      <div className='flex flex-col items-start mb-5 gap-2 pt-2'>
        <label className='label cursor-pointer'>
          <input
            id='lembrar'
            name='lembrar'
            type='checkbox'
            className='checkbox'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className='label-text pl-2'>Lembrar-me</span>
        </label>
        <a className='label-text-alt link link-hover'>Esqueci a senha</a>
      </div>

      <div className='flex flex-col items-center'>
        <LoadingButton msg='Entrar' loading={loading} />
      </div>
    </form>
  );
}
