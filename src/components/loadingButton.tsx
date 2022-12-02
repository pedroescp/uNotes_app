import { LoadingIcon } from '../images/icons/icons';

interface params {
  msg: string;
  loading: boolean;
  loadingMsg?: string;
}

export function LoadingButton({ msg, loading, loadingMsg = 'Carregando...' }: params) {
  return (
    <button disabled={loading} type='submit' className='btn btn-primary btn-wide'>
      {loading ? (
        <>
          <LoadingIcon />
          {loadingMsg}
        </>
      ) : (
        <>{msg}</>
      )}
    </button>
  );
}
