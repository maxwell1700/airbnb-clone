import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LanguageIcon from '@material-ui/icons/Language';
import { Avatar } from '@material-ui/core';
import Modal from './Modal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Header() {


    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(prev => !prev)
    }


    const toggleHome = () => {
        scroll.scrollToTop();
    }
    return (
        <div className='header'>
            <Link to='/' onClick={toggleHome}>
                <img src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                    alt="" className="header__icon" />
            </Link>


            <div className="header__center">
                <input type='text' />
                <SearchIcon />
            </div>
            <div className="header__right">
                <p>Become a host</p>
                <LanguageIcon />
                <ExpandMoreIcon />
                <IconButton>
                    <Avatar onClick={openModal} />
                </IconButton>
                <Modal showModal={showModal} setShowModal={setShowModal} />

            </div>


        </div>



    )
}

export default Header
