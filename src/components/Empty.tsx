import { Player, Controls } from '@lottiefiles/react-lottie-player';

export function Empty() {
  return (
    <>
      <Player
        autoplay
        loop
        src='src\images\lottiefiles\empty.json'
        style={{ height: '300px', width: '300px' }}
      ></Player>
      <h1>Parece que por aqui está vazio</h1>
    </>
  );
}
