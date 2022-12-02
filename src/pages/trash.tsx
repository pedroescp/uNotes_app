import NavBar from '../components/navBar';
import { TrashCharges } from '../components/trashCharge';

const Trash = () => {
  return (
    <NavBar>
      <TrashCharges type={'trash'} />
    </NavBar>
  );
};

export default Trash;
