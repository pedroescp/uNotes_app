import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center h-[calc(100vh_-_80px)] lg:h-screen flex-direction-column items-center'>
      <div className='container px-4'>
        <div className='flex flex-col justify-center items-center h-full  py-4 gap-8  '>
          <Player
            autoplay
            loop
            src='src\images\lottiefiles\404.json'
            style={{ height: '300px', width: '300px' }}
          ></Player>
          <h1>Pagina nao encontratada</h1>
          <button className='btn btn-primary btn-wide' onClick={() => navigate('/home')}>Voltar para o inicio</button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
