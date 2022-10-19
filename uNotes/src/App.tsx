import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './pages/home';
import Login from './pages/login';
import PageNotFound from './pages/PageNotFound';
import Password from './pages/password';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='*' element={<PageNotFound />} />
			<Route path='/login' element={<Login />} />
			<Route path='/home' element={<Home />} />
			<Route path='password' element={<Password />} />
		</Routes>
	);
}

export default App;
