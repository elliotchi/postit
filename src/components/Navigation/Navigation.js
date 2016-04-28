import React, { Component } from 'react'
import { Link } from 'react-router'

const NavLinks = ({ isAuthed }) => (
  isAuthed ?
  <ul>
    <li>
      <Link to='/'>{'Home'}</Link>
    </li>
  </ul> : null
)

const ActionLinks = ({ isAuthed }) => (
  isAuthed ?
    <ul>
      <li>New Post</li>
      <li><Link to='/logout'>{'Logout'}</Link></li>
    </ul> :
    <ul>
      <li><Link to='/'>{'Home'}</Link></li>
      <li><Link to='/auth'>{'Authenticated'}</Link></li>
    </ul>
)

const Navigation = ({ isAuthed }) => (
  <div>Navigation
    <nav>
      <NavLinks isAuthed={isAuthed} />
      <ActionLinks isAuthed={isAuthed} />
    </nav>
  </div>
)

export default Navigation
