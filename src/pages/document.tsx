import NavBar from '../components/navBar';
import { NotesCharges } from '../components/notesCharge';

export default function Document() {
  return (
    <NavBar>
      <NotesCharges type='note' />
    </NavBar>
  );
}
