import {lazy, Suspense, useEffect, FC, ReactElement, useMemo, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationService from './utils/AuthenticationService';
import { GlobalStateProvider } from './context/GlobalState';
import './assets/scss/main.scss';

const Login = lazy(() => import('./pages/Login'));
const Main = lazy(() => import ('./pages/Main'));
const Inventory = lazy(() => import ('./pages/Inventory'));
const Bookmarks = lazy(() => import ('./pages/Bookmarks'));
const Create = lazy(() => import ('./pages/Create'));
const Menu = lazy(() => import ('./components/Menu'));
const Header = lazy(() => import ('./components/Header'));

interface PageWrapperProps {
	pageElement: ReactElement;
}

function App() {
	const [isLogged, setIsLogged] = useState(false);

	const PageWrapper: FC<PageWrapperProps> = ({ pageElement }) => {
		return <>{pageElement}</>;
	};
	const getPage = (page: string): ReactElement => {
        const pages: { [key: string]: ReactElement } = {
			main: <Main />,
			bookmarks: <Bookmarks />,
			inventory: <Inventory />,
			create: <Create />,
		};
		
		const pageElement: ReactElement = pages[page];
		if (!pageElement) {
			throw new Error('Invalid page ' + page);
		}
		return isLogged ? <PageWrapper pageElement={pageElement} /> : <PageWrapper pageElement={<Login/>} />;
    };
	return (
		<div className="main">
			<GlobalStateProvider>
				<BrowserRouter>
					<AuthenticationService setIsLogged={setIsLogged}/>
					<Suspense fallback={<h1>Loading...</h1>}>
						<Header/>
						<Routes>
							<Route path="/" index element={getPage('main')} />
							<Route path="/inventory" element={getPage('inventory')} />
							<Route path="/bookmarks" element={getPage('bookmarks')} />
							<Route path="/create" element={getPage('create')} />
						</Routes>
						<Menu/>
					</Suspense>
				</BrowserRouter>			
			</GlobalStateProvider>
		</div>
	);
}

export default App;
