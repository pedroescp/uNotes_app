import NavBar from '../components/navBar';
import { NotesCharges } from '../components/notesCharge';
import NotesFAB from '../components/noteCreate';

function Note() {
  return (
    <NavBar>
      <NotesCharges type='note'/>
      <NotesFAB />
    </NavBar>
  );
}

export default Note;
