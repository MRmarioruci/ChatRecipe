import {lazy, Suspense, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/scss/main.scss';
import { GlobalStateProvider } from './context/GlobalState';
import { useGlobalState } from './context/GlobalState';

const Main = lazy(() => import ('./pages/Main'));
const Inventory = lazy(() => import ('./pages/Inventory'));
const Bookmarks = lazy(() => import ('./pages/Bookmarks'));
const Create = lazy(() => import ('./pages/Create'));
const Menu = lazy(() => import ('./components/Menu'));
const Header = lazy(() => import ('./components/Header'));

function App() {
	const {state, dispatch} = useGlobalState();
	const {user} = state;
	
	useEffect(() => {
		/* Check if is logged */

	}, [])
	return (
		<GlobalStateProvider>
			<div className="main">
				<BrowserRouter>
                    <Suspense fallback={<h1>Loading...</h1>}>
						<Header />
						<Routes>
							<Route index element={<Main />} />
							<Route path='/inventory' element={<Inventory />} />
							<Route path='/bookmarks' element={<Bookmarks />} />
							<Route path='/create' element={<Create />} />
						</Routes>
						<Menu/>
					</Suspense>
				</BrowserRouter>			
			</div>
		</GlobalStateProvider>
	);
}

export default App;
