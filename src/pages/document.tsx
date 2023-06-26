import { Fragment, useEffect, useRef, useState } from 'react';
import NavBar from '../components/navBar';
import { LoadingIcon, Pencil, Plus, TrashIcon } from '../images/icons/icons';
import { Empty } from '../components/Empty';
import { LoadingButton } from '../components/loadingButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, Transition } from '@headlessui/react';
import categoriaService from '../utils/categoriasService';
import documentoService from '../utils/documentosService';
import { useNavigate } from 'react-router-dom';

export default function Document() {
  const [open, setOpen] = useState(false);
  const [openNewDoc, setOpenNewDoc] = useState(false);
  const [isDeletingCategoriaId, setIsDeletingCategoriaId] = useState(-1);
  const [categorias, setCategorias] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [errors, setErrors] = useState(undefined);
  const [titulo, setTitulo] = useState('Cadastro de');
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(-1);
  const navigate = useNavigate();

  const formik = useFormik({
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
        setOpen(false);
        buscarCategorias();
      } catch (error: any) {
        console.error(error);
        setErrors(error.response.data.errors[0]);
      } finally {
        formik.resetForm();
        setLoading(false);
        setTitulo('Cadastro');
      }
    },
  });

  const newDocument = useFormik({
    initialValues: {
      nome: '',
      categoriaId: '',
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .max(50, 'O documento deve ter no máximo 50 caracteres.')
        .required('Nome do documento não informado.'),
      categoriaId: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = { Titulo: values.nome, Texto: '', CategoriaId: values.categoriaId };
        await documentoService.addDocumento(data);
        setOpenNewDoc(false);
        buscarDocumentos();
      } catch (error: any) {
        console.error(error);
        setErrors(error.response.data.errors[0]);
      } finally {
        newDocument.resetForm();
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    buscarCategorias();
    buscarDocumentos();
    setTimeout(() => {
      const container = document.getElementById('container');
      if (!container) {
        return;
      }

      container.style.height = 'auto';
      container.style.setProperty('height', 'auto', 'important');
    }, 100);
  }, []);

  async function buscarCategorias() {
    const res = await categoriaService.getAllCategorias();
    setCategorias(res.data);
  }

  async function buscarDocumentos() {
    const res = await documentoService.getAllDocumentos();
    setDocumentos(res.data);
  }

  function novaCategoria() {
    formik.setFieldValue('nome', '');
    setOpen(true);
  }

  async function addCategoria(data: any) {
    return (await data.id)
      ? categoriaService.updateCategoria(data)
      : categoriaService.addCategoria(data);
  }

  async function editCategoria(categ: any) {
    setOpen(true);
    setTitulo('Editar');
    formik.setFieldValue('id', categ.id);
    formik.setFieldValue('nome', categ.titulo);
  }

  async function deleteCategoria() {
    if (!isDeletingCategoriaId || isDeletingCategoriaId === -1) {
      return;
    }

    try {
      setLoading(true);
      await categoriaService.deleteCategoria(isDeletingCategoriaId);
      buscarCategorias();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsDeletingCategoriaId(-1);
    }
  }

  async function createDocument(categoriaId: any) {
    setOpenNewDoc(true);
    newDocument.setFieldValue('categoriaId', categoriaId);
  }

  function abrirDocumento(documentoID: number) {
    navigate(`/document/${documentoID}`);
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
                    data-tip='Adicionar categoria'
                    className='grid place-items-center rounded-lg w-8 h-8 bg-teal-600 bg-opacity-80 tooltip'
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
                    onClick={() => setIsDeletingCategoriaId(categoria.id)}
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

  function ModalAdicionarDocumento() {
    const cancelButtonRef = useRef(null);
    const closeModal = () => {
      setOpenNewDoc(false);
    };

    return (
      <Transition.Root show={openNewDoc} as={Fragment}>
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
                  <form onSubmit={newDocument.handleSubmit}>
                    <h3 className='text-lg font-bold pb-2'>Adicionar novo documento</h3>
                    <div className='flex flex-col gap-4'>
                      <div className='form-control w-full'>
                        <label htmlFor='nome' className='label'>
                          <span className='label-text'>Título</span>
                        </label>
                        <input
                          id='nome'
                          name='nome'
                          type='text'
                          placeholder='Type here'
                          className='input input-bordered w-full'
                          onChange={newDocument.handleChange}
                          value={newDocument.values.nome}
                        />
                        {(newDocument.touched.nome && newDocument.errors.nome) || errors ? (
                          <label className='label pb-0 pt-2 pr-0'>
                            <span className='label-text-alt text-error'>
                              {newDocument.errors.nome || errors}
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
                <Dialog.Panel className='p-4 w-full rounded-lg bg-slate-700 shadow-xl transition-all sm:w-full max-w-lg h-full'>
                  <form onSubmit={formik.handleSubmit}>
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

  function ModalDeletarCategoria() {
    const cancelButtonRef = useRef(null);
    const closeModal = () => {
      setIsDeletingCategoriaId(-1);
    };

    return (
      <Transition.Root show={isDeletingCategoriaId !== -1} as={Fragment}>
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
                  <h3 className='text-lg font-bold pb-4'>Deseja excluir essa categoria?</h3>
                  <div className='flex justify-between gap-2'>
                    <button type='button' onClick={closeModal} className='btn gap-2 btn-ghost'>
                      Cancelar
                    </button>
                    <button
                      onClick={() => deleteCategoria()}
                      disabled={loading}
                      type='submit'
                      className='btn btn-error'
                    >
                      {loading ? (
                        <>
                          <LoadingIcon />
                          Excluindo
                        </>
                      ) : (
                        <>Exluir</>
                      )}
                    </button>
                  </div>
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
      <div
        id='container'
        className='grid place-items-center w-full gap-4 container flex-direction-column transition-all'
      >
        <button
          onClick={() => novaCategoria()}
          className='btn bg-base-300 alert shadow-lg max-w-xs content-center mt-20'
        >
          <div className='text-info'>
            <Plus />
            <span className='text-white'>Nova Categoria</span>
          </div>
        </button>
        <ModalCadastroCategoria />
        <ModalDeletarCategoria />
        <ModalAdicionarDocumento />
        {categorias.length <= 0 && <Empty />}
        {categorias
          .filter((x: any) => !x.categoriaPai)
          .map((categoria: any) => (
            <div
              key={categoria.id}
              onMouseEnter={() => handleMouseEnter(categoria.id)}
              onMouseLeave={handleMouseLeave}
              className='collapse collapse-arrow bg-base-100 w-full rounded-box'
            >
              <input type='checkbox' className='!cursor-default' />
              <div className='collapse-title text-xl font-medium flex gap-2 items-center pr-4'>
                <div className='flex gap-4'>
                  <p>{categoria.titulo}</p>
                  <div
                    className={`flex z-10 gap-1 transition-opacity 
                    ${categoria.id === hoveredIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <button
                      data-tip='Adicionar categoria'
                      className='grid place-items-center rounded-lg w-8 h-8 transition-colors hover:bg-white hover:bg-opacity-10 tooltip tooltip-right tooltip-index'
                      onClick={() => createDocument(categoria.id)}
                    >
                      <Plus customWidth='5' />
                    </button>
                    <button
                      data-tip='Editar categoria'
                      className='grid place-items-center rounded-lg w-8 h-8 transition-colors hover:bg-white hover:bg-opacity-10 tooltip tooltip-right tooltip-index'
                      onClick={() => editCategoria(categoria)}
                    >
                      <Pencil customWidth='5' />
                    </button>
                    <button
                      data-tip='Excluir categoria'
                      className='grid place-items-center rounded-lg w-8 h-8 transition-colors hover:bg-white hover:bg-opacity-10 tooltip tooltip-right tooltip-index'
                      onClick={() => setIsDeletingCategoriaId(categoria.id)}
                    >
                      <TrashIcon customWidth='5' />
                    </button>
                  </div>
                </div>
              </div>
              <div className='collapse-content pl-2'>
                {recursionTemplate(categorias, categoria.id)}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-2'>
                  {documentos
                    .filter((x: any) => x.categoriaId === categoria.id)
                    .map((documento: any) => (
                      <div
                        key={documento.id}
                        onClick={() => abrirDocumento(documento.id)}
                        className='rounded-md glass p-2 sm:p-4 h-fit cursor-default transition-all hover:brightness-125 break-words'
                      >
                        <h1 className='text-[#e0e0e0]'>
                          <b>
                            {documento.titulo.length > 20
                              ? documento.titulo.slice(0, 20) + '...'
                              : documento.titulo}
                          </b>
                        </h1>
                        <p>
                          {documento.texto.length > 20
                            ? documento.texto.slice(0, 20) + '...'
                            : documento.texto}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </NavBar>
  );
}
