import { LoadingIcon } from '../images/icons/icons';

interface params {
  msg: string;
  loading: boolean;
  loadingMsg?: string;
  small?: boolean;
}

export function LoadingButton({
  msg,
  loading,
  loadingMsg = 'Carregando...',
  small = false,
}: params) {
  return (
    <button
      disabled={loading}
      type='submit'
      className={`btn btn-primary ${small ? '' : 'btn-wide'}`}
    >
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
