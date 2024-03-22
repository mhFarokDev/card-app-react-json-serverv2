import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import "./Header.scss"

const Header = () => {
  return (
    <div>
        <div className="header">
            <Container>
                <div className="main-deader">
                    <div className="logo">
                        <Link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Groww_app_logo.png" alt="" /></Link>
                    </div>
                    <div className="menu">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/developers">Developers</Link></li>
                            <li><Link to="/add">Add Devs</Link></li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Header