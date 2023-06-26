import { Fragment, useEffect, useRef, useState } from 'react';
import NavBar from '../components/navBar';
import { Pencil, Plus } from '../images/icons/icons';
import * as Yup from 'yup';
import usuarioSerivce from '../utils/usuarioService';
import categoriaService from '../utils/categoriasService';
import { Transition, Dialog } from '@headlessui/react';
import { LoadingButton } from '../components/loadingButton';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    getUsuario();
    getCategoria();
  }, []);

  async function getUsuario() {
    const response = await usuarioSerivce.getUsuarioLogado();
    if (!response.data?.avatar) {
      response.data.avatar =
        'data:image/png;base64,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';
    }
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

  function ModalPerfil() {
    const [telefone, setTelefone] = useState('');

    const formatTelefone = (value: string) => {
      const numero = value.replace(/\D/g, '');

      let numFormatado = '';
      if (numero.length <= 2) {
        numFormatado = numero;
      } else if (numero.length <= 6) {
        numFormatado = `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
      } else if (numero.length <= 10) {
        numFormatado = `(${numero.slice(0, 2)}) ${numero.slice(2, 6)}-${numero.slice(6)}`;
      } else {
        numFormatado = `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7, 11)}`;
      }

      setTelefone(numFormatado);
    };

    return (
      <dialog className='dialog-perfil m-auto p-4 z-10 rounded-lg bg-slate-700 shadow-xl transition-all sm:w-full max-w-lg text-slate-100'>
        <form id='form' onSubmit={(e) => EditarPerfil(e)}>
          <h3 className='text-lg font-bold pb-2'>Editar Perfil</h3>
          <div className='divider mt-0' />
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
              />
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
              />
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
              />
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
                value={telefone}
                onChange={(e) => formatTelefone(e.target.value)}
                className='input input-bordered w-full'
              />
            </div>

            <div className='flex justify-between gap-2'>
              <button type='button' className='btn gap-2 btn-ghost' onClick={() => closeModal()}>
                Cancelar
              </button>
              <LoadingButton msg='Salvar' loading={loading} loadingMsg='Salvando' small={true} />
            </div>
          </div>
        </form>
      </dialog>
    );
  }

  async function EditarPerfil(event: any) {
    event.preventDefault();
    const form = document.getElementById('form');
    if (!(form instanceof HTMLFormElement)) return;

    let formData = new FormData(form);
    var formObject: any = {};

    const errors = [];
    for (var pair of formData.entries()) {
      var key = pair[0];
      var value = pair[1].toString();

      if (value.length == 0) {
        errors.push(`O campo "${key}" é obrigatório.`);
      } else if (value.length > 50) {
        errors.push(`O ${key} deve ter no máximo 50 caracteres.`);
      }

      if (
        key === 'id' ||
        key === 'nome' ||
        key === 'login' ||
        key === 'email' ||
        key === 'telefone'
      ) {
        formObject[key] = value;
      }
    }

    if (errors.length > 0) {
      errors.forEach((erro) => {
        toast.error(erro, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      });

      setOpenModal();
      return;
    }

    formObject.id = (usuario as any)?.id;
    formObject.cargoId = (usuario as any)?.cargoId;

    try {
      setLoading(true);
      await usuarioSerivce.atualizarUsuarioLogado(formObject);
      toast.success('Dados atualizados com sucesso!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      getUsuario();
      closeModal();
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function openModal() {
    const nome = document.getElementById('nome') as any;
    const login = document.getElementById('login') as any;
    const email = document.getElementById('email') as any;
    const telefone = document.getElementById('telefone') as any;

    if (nome) nome.value = (usuario as any)?.nome;
    if (login) login.value = (usuario as any)?.login;
    if (email) email.value = (usuario as any)?.email;
    if (telefone) telefone.value = (usuario as any)?.telefone;

    setOpenModal();
  }

  function setOpenModal() {
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
  }

  function closeModal() {
    const dialog = document.querySelector('dialog');
    dialog?.close();
  }

  return (
    <>
      <NavBar>
        <div className='container pt-[68px] !flex-col'>
          <div className='flex justify-center md:justify-between'>
            <div className='avatar items-center'>
              <div className='w-32 mask mask-hexagon m-2 animate-pulse bg-primary p-2'>
                <img src={(usuario as any)?.avatar} onClick={() => openModal()} />
              </div>
              <label
                data-tip='Editar perfil'
                onClick={() => openModal()}
                className='flex gap-2 text-2xl items-center tooltip cursor-pointer'
              >
                {(usuario as any)?.nome}
                <Pencil />
              </label>
            </div>
          </div>
          <hr />
          <div className='grid gap-2'>
            <div className='flex justify-center md:justify-between m-4'>
              <h2>CATEGORIAS</h2>
              <button
                data-tip='Adicionar categoria'
                className='grid place-items-center rounded-lg w-8 h-8 transition-colors hover:bg-white hover:bg-opacity-10 tooltip'
                onClick={() => setOpenCateg(true)}
              >
                <Plus />
              </button>
            </div>
            <div className='card w-auto bg-neutral text-neutral-content'>
              <div className='card-body grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {categorias.map((categoria: any) => (
                  <div
                    className='glass py-2 px-4 flex items-center text-center rounded-md break-all'
                    key={categoria.id}
                  >
                    <p>{categoria.titulo}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ModalPerfil />
        <ModalCadastroCategoria />
        <ToastContainer />
      </NavBar>
    </>
  );
};

export default Profile;
