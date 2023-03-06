import { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import { UserIcon } from '../images/icons/icons';
import api from '../utils/api';

const Profile = () => {
    const [usuarios, setUsuario] = useState([]);

    useEffect(() => {
        async function getUsuario() {
            //make a filter
            const response = await api.usuarioGet()
            setUsuario(response.data)
        }
        getUsuario();


    }, []);


    return (
        <>
            <NavBar>
                <div className='container justify-center items-center'>
                    <div className='card w-96 bg-base-100 shadow-xl'>
                        <figure className='px-10 pt-10'>
                            <div className='avatar online'>
                                <div className='w-24 rounded-full'>
                                    {/* <img src='src\images\icons\' /> */}
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
                </div>
            </NavBar>
        </>
    );
};

export default Profile;
