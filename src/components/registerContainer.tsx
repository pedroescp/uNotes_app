import { useFormik } from 'formik';
import { AuthContext } from '../contents/auth/';
import { HtmlHTMLAttributes, useContext, useState } from 'react';
import * as Yup from 'yup';
import api from '../utils/api';

interface props extends HtmlHTMLAttributes<HTMLHtmlElement> {
  aparece: boolean;
}

export function RegisterContainer(props: props) {
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const formikRegister = useFormik({
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
      email: Yup.string().email('E-mail inválido').required('E-mail não informado'),
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
      console.log('🐒 - values', values);
      setLoading(true);
      const dataResponse = {
        login: values.usuario,
        nome: values.usuario,
        email: values.email,
        senha: values.senha,
        telefone: null,
      };

      api
        .usuarioRegs(dataResponse)
        .then((res) => {
          console.log('🐒 - res', res);
          if (res.statusText !== 'Created') {
            return;
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
    <form
      onSubmit={formikRegister.handleSubmit}
      className={'form-control w-full max-w-xl' + (props.aparece ? '' : ' hidden')}
    >
      <label htmlFor='usuario' className='label'>
        <span className='label-text'>Usuário</span>
      </label>
      <input
        id='usuario'
        name='usuario'
        type='text'
        className='input input-bordered w-full max-w-xl'
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        value={formikRegister.values.usuario}
      />
      {(formikRegister.touched.usuario && formikRegister.errors.usuario) || errors ? (
        <label className='label pb-0 pt-2 pr-0'>
          <span className='label-text-alt text-error'>
            {formikRegister.errors.usuario || errors}
          </span>
        </label>
      ) : null}
      <label htmlFor='email' className='label'>
        <span className='label-text'>E-mail</span>
      </label>
      <input
        id='email'
        name='email'
        type='text'
        className='input input-bordered w-full max-w-xl'
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        value={formikRegister.values.email}
      />
      {(formikRegister.touched.email && formikRegister.errors.email) || errors ? (
        <label className='label pb-0 pt-2 pr-0'>
          <span className='label-text-alt text-error'>{formikRegister.errors.email || errors}</span>
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
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        value={formikRegister.values.senha}
      />
      {(formikRegister.touched.senha && formikRegister.errors.senha) || errors ? (
        <label className='label pb-0 pt-2 pr-0'>
          <span className='label-text-alt text-error'>{formikRegister.errors.senha || errors}</span>
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
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        value={formikRegister.values.repeteSenha}
      />
      {(formikRegister.touched.repeteSenha && formikRegister.errors.repeteSenha) || errors ? (
        <label className='label pb-0 pt-2 pr-0'>
          <span className='label-text-alt text-error'>
            {formikRegister.errors.repeteSenha || errors}
          </span>
        </label>
      ) : null}

      <div className='flex flex-col items-center mt-5'>
        <button
          type='submit'
          onClick={() => formikRegister.submitForm}
          className='btn btn-primary btn-wide'
        >
          Registrar e entrar!
        </button>
      </div>
    </form>
  );
}
