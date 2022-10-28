import { HomePage } from '../components/homepageComponent';
import { ProfileNavbar } from '../components/profileNavbarComponent';
import TextEditor from '../TextEditor';

function Home() {
	return (
		<>
			<ProfileNavbar />
			<HomePage></HomePage>
		</>
	);
}

export default Home;
