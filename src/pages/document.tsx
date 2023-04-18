import { Fragment, useEffect, useRef, useState } from 'react';
import NavBar from '../components/navBar';
import { Pencil, Plus, TrashIcon } from '../images/icons/icons';
import { Empty } from '../components/Empty';
import api from '../utils/api';
import { LoadingButton } from '../components/loadingButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, Transition } from '@headlessui/react';

export default function Document() {
  const [open, setOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState(undefined);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(-1);

  const formik = useFormik({
    initialValues: {
      nome: '',
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .max(50, 'A categoria deve ter no máximo 50 caracteres.')
        .required('Nome da categoria não informado.'),
    }),
    onSubmit: async (values) => {
      console.log('🐒 - values:', values);
      try {
        setLoading(true);
        // Categoria pai: Quando for criar uma nova (Botão "+ Nova Categoria") deve ser igual a 0.
        // Quando for a partir de um filho, Categoria Pai: ID da categoria selecionada.
        const data = { Titulo: values.nome, CategoriaPai: 0, CriadorId: '???' };
        await addCategoria(data);
        console.log('🐒 - data:', data);
        buscarCategorias();
      } catch (error: any) {
        console.error(error);
        setErrors(error.response.data.errors[0]);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    const res = await api.getAllCategorias();
    setCategorias(res.data);
  }

  async function addCategoria(data: any) {
    const res = await api.addCartegoria(data);
    console.log('🐒 - addCategoria res:', res);
  }

  async function editCategoria(categoria: any) {
    console.log('🐒 - categoria:', categoria);
  }

  async function deleteCategoria(categoria: any) {
    console.log('🐒 - categoria:', categoria);
  }

  async function createDocument(categoriaId: any) {
    console.log('🐒 - categoriaId:', categoriaId);
  }

  function recursionTemplate(categoria: any, subCategoriaId: number, hasBorder = false) {
    return (
      <>
        {categoria
          .filter((x: any) => x.categoriaPai === subCategoriaId)
          .map((subCategoria: any) => (
            <div
              key={subCategoria.id}
              onMouseEnter={() => handleMouseEnter(subCategoria.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => console.log(subCategoria)}
              className={`collapse border border-base-300 rounded-box w-full 
              ${hasBorder ? 'border-r-0 border-b-0' : ''}`}
            >
              <input type='checkbox' />
              <div className='collapse-title text-xl font-medium flex gap-2 items-center'>
                {subCategoria.titulo}
                <div
                  className={`flex z-10 gap-1 transition-opacity 
                  ${categoria.id === hoveredIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <button
                    className='grid place-items-center rounded-lg w-8 h-8 bg-teal-600 bg-opacity-80'
                    onClick={() => createDocument(categoria.id)}
                  >
                    <Plus customWidth='5' />
                  </button>
                  <button
                    className='grid place-items-center rounded-lg w-8 h-8 bg-cyan-600 bg-opacity-80 '
                    onClick={() => editCategoria(categoria)}
                  >
                    <Pencil customWidth='5' />
                  </button>
                  <button
                    className='grid place-items-center rounded-lg w-8 h-8 bg-red-600 bg-opacity-80'
                    onClick={() => deleteCategoria(categoria)}
                  >
                    <TrashIcon customWidth='5' />
                  </button>
                </div>
              </div>
              <div className='collapse-content pl-2 !pb-0 pr-0'>
                {recursionTemplate(categoria, subCategoria.id, true)}
              </div>
            </div>
          ))}
      </>
    );
  }

  function ModalCadastroCategoria() {
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
                <Dialog.Panel className='p-4 w-full rounded-lg bg-slate-700 shadow-xl transition-all'>
                  <form onSubmit={formik.handleSubmit}>
                    <h3 className='text-lg font-bold pb-2'>Cadastro de Categoria</h3>
                    <div className='flex flex-col gap-4'>
                      <div className='form-control w-full'>
                        <label htmlFor='nome' className='label'>
                          <span className='label-text'>Nome</span>
                        </label>
                        <input
                          id='nome'
                          name='nome'
                          type='text'
                          placeholder='Type here'
                          className='input input-bordered w-full'
                          onChange={formik.handleChange}
                          value={formik.values.nome}
                        />
                        {(formik.touched.nome && formik.errors.nome) || errors ? (
                          <label className='label pb-0 pt-2 pr-0'>
                            <span className='label-text-alt text-error'>
                              {formik.errors.nome || errors}
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
    <NavBar>
      <div className='mt-20 grid place-items-center w-full gap-4'>
        <button onClick={() => setOpen(true)} className='btn bg-base-300 alert shadow-lg'>
          <div className='text-info'>
            <Plus />
            <span className='text-white'>Nova Categoria</span>
          </div>
        </button>
        <ModalCadastroCategoria />
        {categorias.length <= 0 && <Empty />}
        {categorias
          .filter((x: any) => x.categoriaPai === 0)
          .map((categoria: any) => (
            <div
              key={categoria.id}
              onMouseEnter={() => handleMouseEnter(categoria.id)}
              onMouseLeave={handleMouseLeave}
              className='collapse bg-base-100 rounded-box w-full min-h-[70px]'
            >
              <input type='checkbox' />
              <div className='collapse-title text-xl font-medium flex gap-2 items-center'>
                <p>{categoria.titulo}</p>
                <div
                  className={`flex z-10 gap-1 transition-opacity 
                  ${categoria.id === hoveredIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <button
                    className='grid place-items-center rounded-lg w-8 h-8 transition-colors hover:bg-white hover:bg-opacity-10'
                    onClick={() => createDocument(categoria.id)}
                  >
                    <Plus customWidth='5' />
                  </button>
                  <button
                    className='grid place-items-center rounded-lg w-8 h-8 transition-colors hover:bg-white hover:bg-opacity-10'
                    onClick={() => editCategoria(categoria)}
                  >
                    <Pencil customWidth='5' />
                  </button>
                  <button
                    className='grid place-items-center rounded-lg w-8 h-8 transition-colors hover:bg-white hover:bg-opacity-10'
                    onClick={() => deleteCategoria(categoria)}
                  >
                    <TrashIcon customWidth='5' />
                  </button>
                </div>
              </div>
              <div className='collapse-content pl-2'>
                {recursionTemplate(categorias, categoria.id)}
              </div>
            </div>
          ))}
      </div>
    </NavBar>
  );
}
