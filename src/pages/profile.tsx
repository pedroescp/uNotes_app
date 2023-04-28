import { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import { UserIcon } from '../images/icons/icons';
import api from '../utils/api';

const Profile = () => {
    const [usuario, setUsuario] = useState();
    const [categorias, setCategorias] = useState([]);

    const handleChange = categorias => {
        setCategorias(categorias.target.value);

        console.log('value is:', categorias.target.value);
    };

    useEffect(() => {
        async function getUsuario() {
            //make a filter
            const response = await api.usuarioGet()
            setUsuario(response.data)

        }

        async function getCategoria() {
            const response = await api.CategoriaGet()
            console.log(response.data);

            setCategorias(response.data.data)
        }
        getUsuario();
        getCategoria();
    },
        []);

    return (
        <>
            <NavBar>
                {/* Capa */}
                <div className='container pt-[68px] !flex-col'>
                    <div className="grid place-itens-start">
                        <div className="bg-[url('https://placeimg.com/192/192/people')] w-full h-48 shadow-x1 rounded-full">
                            <figure className='px-10 pt-40 bg-none'></figure>
                        </div>
                    </div>
                    {/* Avatar */}
                    <div className="flex justify-center md:justify-between">
                        <div className="avatar">
                            <div className='w-32 mask mask-hexagon m-2'>
                                <img src="https://placeimg.com/192/192/people" />
                            </div>
                            <h2 className='pt-16 p-2'>{(usuario as any)?.data.nome}</h2>
                            {/* Modal edição */}
                            <label htmlFor="my-modal-2" className="mt-16">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                </svg>
                            </label>
                            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
                            <label htmlFor="my-modal-2" className="modal cursor-pointer?">
                                <label className="modal-box relative" htmlFor="">
                                    <div className="grid place-itens-start">
                                        <div className="bg-[url('https://placeimg.com/192/192/people')] w-full h-48 shadow-x1 rounded-full">
                                            <figure className='px-10 pt-40 bg-none'></figure>
                                        </div>
                                    </div>
                                    <label htmlFor="">Nome: <br />
                                        <input type="text" placeholder="Type here" className="input input-bordered input-md w-full max-w-xs" />
                                    </label>
                                    <br />
                                    <label htmlFor="">Categoria:</label>
                                    <div className="card w-16 ">
                                        <div className="card-body items-center text-center">
                                            <input type="checkbox" name="categorias" id="categorias" />
                                            <ul>
                                                {categorias.map((categoria: any) => (
                                                    <li>{categoria.titulo}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="p-2 flex">
                                        <div className="w-1/2">
                                            <label htmlFor="my-modal-2" className="btn btn-outline btn-error">Cancelar!</label>
                                        </div>
                                        <div className="w-1/2 flex justify-end">
                                            <button className="btn btn-outline btn-success ml-6">Salvar</button>
                                        </div>
                                    </div>
                                </label>
                            </label>
                        </div>
                    </div>
                    <hr />
                    {/* Modal add categoria */}
                    <div className="flex justify-center md:justify-between m-4">
                        <h2> CATEGORIAS</h2>
                        <label htmlFor="my-modal-4" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clip-rule="evenodd" />
                            </svg>
                        </label>
                        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                        <label htmlFor="my-modal-4" className="modal cursor-pointer">
                            <label className="modal-box relative" htmlFor="">
                                <label htmlFor="">Categoria: <br />
                                    <input type="text" placeholder="Type here" className="input input-bordered input-md w-full max-w-xs" />
                                </label>
                            </label>
                        </label>
                    </div>
                    {/* Div Categorias */}
                    <div className="card w-auto bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <ul>
                                {categorias.map((categoria: any) => (
                                    <li>{categoria.titulo}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>


                {/* <div className='container justify-center items-center'>
                    <div className='card w-96 bg-base-100 shadow-xl'>
                        <figure className='px-10 pt-10'>
                            <div className='avatar online'>
                                <div className='w-24 rounded-full'>
                                    <img src='https://placeimg.com/192/192/people' />
                                </div>
                            </div>
                        </figure>
                        <div className='card-body items-center text-center'>
                            <h2 className='card-title'>
                                Hello {(usuarios['nome'])}
                            </h2> 
                            <p>Nickname: {(usuarios['login'])}</p>
                            <p>E-mail: {(usuarios['email'])}</p>
                            <p> Telefone: {(usuarios['telefone'])}</p>
                        </div>
                    </div>
                </div> */}
            </NavBar >
        </>
    );
};

export default Profile;
