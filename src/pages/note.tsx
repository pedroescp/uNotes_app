import NavBar from '../components/navBar';
import { NotesCharges } from '../components/notesCharge';

function Note() {
  return (
    <NavBar>
      <NotesCharges type='note' />
    </NavBar>
  );
}

export default Note;
