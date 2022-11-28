import NavBar from '../components/navBar';

const Profile = () => {
  return (
    <>
      <NavBar>
        <div className='container justify-center items-center'>
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
                Hello {String(JSON.parse(localStorage.getItem('user')).user)}
              </h2>
              <p>Email: {String(JSON.parse(localStorage.getItem('user')).email)}</p>
            </div>
          </div>
        </div>
      </NavBar>
    </>
  );
};

export default Profile;
