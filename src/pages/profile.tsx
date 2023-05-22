import { Fragment, useEffect, useRef, useState } from 'react';
import NavBar from '../components/navBar';
import { Pencil, Plus } from '../images/icons/icons';
import * as Yup from 'yup';
import usuarioSerivce from '../utils/usuarioService';
import categoriaService from '../utils/categoriasService';
import { Transition, Dialog } from '@headlessui/react';
import { LoadingButton } from '../components/loadingButton';
import { useFormik } from 'formik';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [openCateg, setOpenCateg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [usuario, setUsuario] = useState();
  const [titulo, setTitulo] = useState('Cadastro de');
  const [categorias, setCategorias] = useState([]);

  const categForm = useFormik({
    initialValues: {
      id: '',
      nome: '',
    },
    validationSchema: Yup.object({
      id: Yup.string(),
      nome: Yup.string()
        .max(50, 'A categoria deve ter no máximo 50 caracteres.')
        .required('Nome da categoria não informado.'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Categoria pai: Quando for criar uma nova (Botão "+ Nova Categoria") deve ser igual a 0.
        // Quando for a partir de um filho, Categoria Pai: ID da categoria selecionada.
        const data = { id: values.id, Titulo: values.nome, CategoriaPai: null };
        await addCategoria(data);
        setOpenCateg(false);
        getCategoria();
      } catch (error: any) {
        console.error(error);
        setErrors(error.response.data.errors[0]);
      } finally {
        categForm.resetForm();
        setLoading(false);
        setTitulo('Cadastro');
      }
    },
  });

  const usuarioForm = useFormik({
    initialValues: {
      id: '',
      nome: '',
      login: '',
      email: '',
      telefone: '',
    },
    validationSchema: Yup.object({
      id: Yup.string(),
      nome: Yup.string()
        .max(50, 'O nome deve ter no máximo 50 caracteres.')
        .required('Nome não informado.'),
      login: Yup.string()
        .max(50, 'O login deve ter no máximo 50 caracteres.')
        .required('Login não informado.'),
      email: Yup.string()
        .max(50, 'O e-mail deve ter no máximo 50 caracteres.')
        .required('E-mail não informado.'),
      telefone: Yup.string()
        .max(50, 'O telefone deve ter no máximo 11 caracteres.')
        .required('Telefone não informado.'),
    }),
    onSubmit: async (values) => {
      console.log('🐒 - values:', values);
      try {
        setLoading(true);
        //const data = { id: values.id, Titulo: values.nome, CategoriaPai: null };
        // await addCategoria(data);
        setOpen(false);
        getUsuario();
      } catch (error: any) {
        console.error(error);
        setErrors(error.response.data.errors[0]);
      } finally {
        usuarioForm.resetForm();
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    getUsuario();
    getCategoria();
  }, []);

  async function getUsuario() {
    const response = await usuarioSerivce.getUsuarioLogado();
    setUsuario(response.data);
  }

  async function getCategoria() {
    const response = await categoriaService.getAllCategorias();
    setCategorias(response.data);
  }

  async function addCategoria(data: any) {
    return (await data.id)
      ? categoriaService.updateCategoria(data)
      : categoriaService.addCategoria(data);
  }

  /* Não usado ainda */
  async function editCategoria(categ: any) {
    setOpenCateg(true);
    setTitulo('Editar');
    categForm.setFieldValue('id', categ.id);
    categForm.setFieldValue('nome', categ.titulo);
  }

  function ModalCadastroCategoria() {
    const cancelButtonRef = useRef(null);
    const closeModal = () => {
      setOpenCateg(false);
    };

    return (
      <Transition.Root show={openCateg} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          initialFocus={cancelButtonRef}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
          </Transition.Child>

          <div className='fixed h-fit m-auto flex inset-0 z-10 overflow-y-auto px-4'>
            <div className='grid place-items-center w-full'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='p-4 w-full rounded-lg bg-slate-700 shadow-xl transition-all sm:w-full max-w-lg h-full'>
                  <form onSubmit={categForm.handleSubmit}>
                    <h3 className='text-lg font-bold pb-2'>{titulo} Categoria</h3>
                    <div className='flex flex-col gap-4'>
                      <div className='form-control w-full'>
                        <label htmlFor='nome' className='label'>
                          <span className='label-text'>Nome</span>
                        </label>
                        <input
                          id='nome'
                          name='nome'
                          type='text'
                          placeholder='Nome'
                          className='input input-bordered w-full'
                          onChange={categForm.handleChange}
                          value={categForm.values.nome}
                        />
                        {(categForm.touched.nome && categForm.errors.nome) || errors ? (
                          <label className='label pb-0 pt-2 pr-0'>
                            <span className='label-text-alt text-error'>
                              {categForm.errors.nome || errors}
                            </span>
                          </label>
                        ) : null}
                      </div>

                      <div className='flex justify-between gap-2'>
                        <button type='button' onClick={closeModal} className='btn gap-2 btn-ghost'>
                          Cancelar
                        </button>
                        <LoadingButton
                          msg='Salvar'
                          loading={loading}
                          loadingMsg='Salvando'
                          small={true}
                        />
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }

  function ModalEdicaoPerfil() {
    const cancelButtonRef = useRef(null);
    const closeModal = () => {
      setOpen(false);
    };

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          initialFocus={cancelButtonRef}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
          </Transition.Child>

          <div className='fixed h-fit m-auto flex inset-0 z-10 overflow-y-auto px-4'>
            <div className='grid place-items-center w-full'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='p-4 w-full rounded-lg bg-slate-700 shadow-xl transition-all sm:w-full max-w-lg h-full'>
                  <form onSubmit={usuarioForm.handleSubmit}>
                    <h3 className='text-lg font-bold pb-2'>Editar Perfil</h3>
                    <div className='divider mt-0'></div>
                    <div className='grid place-itens-start'>
                      <div className="bg-[url('https://placeimg.com/192/192/people')] w-full h-48 shadow-x1 rounded-full">
                        <figure className='px-10 pt-40 bg-none'></figure>
                      </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                      <div className='form-control w-full'>
                        <label htmlFor='login' className='label'>
                          <span className='label-text'>Login</span>
                        </label>
                        <input
                          id='login'
                          name='login'
                          type='text'
                          placeholder='Login'
                          className='input input-bordered w-full'
                          onChange={usuarioForm.handleChange}
                          value={usuarioForm.values.login}
                        />
                        {(usuarioForm.touched.login && usuarioForm.errors.login) || errors ? (
                          <label className='label pb-0 pt-2 pr-0'>
                            <span className='label-text-alt text-error'>
                              {usuarioForm.errors.login || errors}
                            </span>
                          </label>
                        ) : null}
                      </div>

                      <div className='form-control w-full'>
                        <label htmlFor='nome' className='label'>
                          <span className='label-text'>Nome</span>
                        </label>
                        <input
                          id='nome'
                          name='nome'
                          type='text'
                          placeholder='Nome'
                          className='input input-bordered w-full'
                          onChange={usuarioForm.handleChange}
                          value={usuarioForm.values.nome}
                        />
                        {(usuarioForm.touched.nome && usuarioForm.errors.nome) || errors ? (
                          <label className='label pb-0 pt-2 pr-0'>
                            <span className='label-text-alt text-error'>
                              {usuarioForm.errors.nome || errors}
                            </span>
                          </label>
                        ) : null}
                      </div>

                      <div className='form-control w-full'>
                        <label htmlFor='email' className='label'>
                          <span className='label-text'>E-mail</span>
                        </label>
                        <input
                          id='email'
                          name='email'
                          type='text'
                          placeholder='E-mail'
                          className='input input-bordered w-full'
                          onChange={usuarioForm.handleChange}
                          value={usuarioForm.values.email}
                        />
                        {(usuarioForm.touched.email && usuarioForm.errors.email) || errors ? (
                          <label className='label pb-0 pt-2 pr-0'>
                            <span className='label-text-alt text-error'>
                              {usuarioForm.errors.email || errors}
                            </span>
                          </label>
                        ) : null}
                      </div>

                      <div className='form-control w-full'>
                        <label htmlFor='telefone' className='label'>
                          <span className='label-text'>Telefone</span>
                        </label>
                        <input
                          id='telefone'
                          name='telefone'
                          type='text'
                          placeholder='(00) 00000-0000'
                          className='input input-bordered w-full'
                          onChange={usuarioForm.handleChange}
                          value={usuarioForm.values.telefone}
                        />
                        {(usuarioForm.touched.telefone && usuarioForm.errors.telefone) || errors ? (
                          <label className='label pb-0 pt-2 pr-0'>
                            <span className='label-text-alt text-error'>
                              {usuarioForm.errors.telefone || errors}
                            </span>
                          </label>
                        ) : null}
                      </div>

                      <div className='flex justify-between gap-2'>
                        <button type='button' onClick={closeModal} className='btn gap-2 btn-ghost'>
                          Cancelar
                        </button>
                        <LoadingButton
                          msg='Salvar'
                          loading={loading}
                          loadingMsg='Salvando'
                          small={true}
                        />
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }

  return (
    <>
      <NavBar>
        {/* Capa */}
        <div className='container pt-[68px] !flex-col'>
          <div className='grid place-itens-start'>
            <div className="bg-[url('https://placeimg.com/192/192/people')] w-full h-48 shadow-x1 rounded-full">
              <figure className='px-10 pt-40 bg-none'></figure>
            </div>
          </div>
          {/* Avatar */}
          <div className='flex justify-center md:justify-between'>
            <div className='avatar items-center'>
              <div className='w-32 mask mask-hexagon m-2'>
                <img src='https://placeimg.com/192/192/people' />
              </div>
              <label onClick={() => setOpen(true)} className='flex gap-2 p-1 text-2xl items-center'>
                {(usuario as any)?.nome}
                <Pencil />
              </label>
            </div>
          </div>
          <hr />
          {/* Modal add categoria */}
          <div className='flex justify-center md:justify-between m-4'>
            <h2>CATEGORIAS</h2>
            <button
              className='grid place-items-center rounded-lg w-8 h-8 transition-colors hover:bg-white hover:bg-opacity-10'
              onClick={() => setOpenCateg(true)}
            >
              <Plus />
            </button>
          </div>
          {/* Div Categorias */}
          <div className='card w-auto bg-neutral text-neutral-content'>
            <div className='card-body items-center text-center'>
              <ul>
                {categorias.map((categoria: any) => (
                  <li key={categoria.id}>{categoria.titulo}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <ModalEdicaoPerfil />
        <ModalCadastroCategoria />
      </NavBar>
    </>
  );
};

export default Profile;
