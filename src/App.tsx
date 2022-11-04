import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './pages/home';
import Login from './pages/login';
import Note from './pages/note';
import PageNotFound from './pages/PageNotFound';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='*' element={<PageNotFound />} />
			<Route path='/login' element={<Login />} />
			<Route path='/home' element={<Home />} />
			<Route path='/note' element={<Note />} />
		</Routes>
	);
}

export default App;
	