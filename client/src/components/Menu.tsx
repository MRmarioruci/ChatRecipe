import { Link, useLocation } from 'react-router-dom'

function Menu() {
    const location = useLocation();
    const { pathname } = location;
    return (
        <div className="main__menu">
            <Link className={`main__menu-item ${pathname === '/' && 'main__menu-itemActive'}`} to="/">
                <span className="material-icons font__25">home</span>
                Home
            </Link>
            <Link className={`main__menu-item ${pathname === '/inventory' && 'main__menu-itemActive'}`} to="/inventory">
                <span className="material-icons font__25">inventory</span>
                My inventory
            </Link>
            {/* <Link className={`main__menu-item ${pathname === '/create' && 'main__menu-itemActive'}`} to="/create" title="Suggest">
                <img src={idea} width={30}/>
                Suggest
            </Link> */}
            <Link className={`main__menu-item ${pathname === '/bookmarks' && 'main__menu-itemActive'}`} to="/bookmarks">
                <span className="material-icons font__25">bookmark_border</span>
                Bookmarks
            </Link>
        </div>
    )
}

export default Menu