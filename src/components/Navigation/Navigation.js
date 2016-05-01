import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { container, navContainer, link } from './styles.css';
import { ModalContainer } from 'containers';

const NavLinks = ({ isAuthed }) => (
  isAuthed ?
  <ul>
    <li>
      <Link className={link} to='/'>{'Home'}</Link>
    </li>
  </ul> : null
)

const ActionLinks = ({ isAuthed }) => (
  isAuthed ?
    <ul>
      <li><ModalContainer /></li>
      <li><Link className={link} to='/logout'>{'Logout'}</Link></li>
    </ul> :
    <ul>
      <li><Link className={link} to='/'>{'Home'}</Link></li>
      <li><Link className={link} to='/auth'>{'Authenticated'}</Link></li>
    </ul>
)

const Navigation = ({ isAuthed }) => (
  <div className={container}>
    <nav className={navContainer}>
      <NavLinks isAuthed={isAuthed} />
      <ActionLinks isAuthed={isAuthed} />
    </nav>
  </div>
)

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

export default Navigation
