import React from 'react'
import logo from '../assets/images/logo.png';

function Header() {
    return (
        <div className="main__header">
            <div className="main__header-logo">
                <img  src={logo} width={60}/>
                ChatRecipe
            </div>
            <div className="main__header-account">
                MR
            </div>
        </div>
    )
}

export default Header