import {lazy, Suspense, FC, ReactElement, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationService from './utils/AuthenticationService';
import './assets/scss/main.scss';
import 'animate.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Login = lazy(() => import('./pages/Login'));
const Registration = lazy(() => import('./pages/Registration'));
const Main = lazy(() => import ('./pages/Main'));
const Inventory = lazy(() => import ('./pages/Inventory'));
const Bookmarks = lazy(() => import ('./pages/Bookmarks'));
const Website = lazy(() => import ('./pages/Website'));
const Generate = lazy(() => import ('./components/Generate'));
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
			main: isLogged ? <Main /> : <Website />,
			bookmarks: isLogged ? <Bookmarks /> : <Login />,
			inventory: isLogged ? <Inventory /> : <Login />,
			login: isLogged ? <Main /> : <Login />,
			register: isLogged ? <Main /> : <Registration />,
		};
		
		const pageElement: ReactElement = pages[page];
		if (!pageElement) {
			throw new Error('Invalid page ' + page);
		}
		return <PageWrapper pageElement={pageElement} />;
    };
	return (
		<div className="main">
			<BrowserRouter>
				<AuthenticationService setIsLogged={setIsLogged} />
				<Suspense fallback={<h1>Loading...</h1>}>
					{isLogged && <Header/>}
					<GoogleOAuthProvider clientId="271739434918-5s729u2fmm31b7pfoccgpva39mr1mmci.apps.googleusercontent.com">
						<Routes>
							<Route path="/" index element={getPage('main')} />
							<Route path="/inventory" element={getPage('inventory')} />
							<Route path="/bookmarks" element={getPage('bookmarks')} />
							<Route path="/login" element={getPage('login')} />
							<Route path="/register" element={getPage('register')} />
						</Routes>
					</GoogleOAuthProvider>
					{isLogged && 
						<>
							<Generate />
							<Menu/>
						</>
					}
				</Suspense>
			</BrowserRouter>			
		</div>
	);
}

export default App;
