import { useParams } from 'react-router-dom';

export default function EditDocumento() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className='grid place-items-center h-full w-full'>
      <h1>Documento {id}</h1>
    </div>
  );
}
