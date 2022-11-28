import NavBar from '../components/navBar';
import { NotesCharges } from '../components/notesCharge';

const Trash = () => {
  return (
    <NavBar>
      <NotesCharges type={'trash'} />
    </NavBar>
  );
};

export default Trash;
