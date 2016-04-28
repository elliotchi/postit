import React, { Component, PropTypes } from 'react'
import { container, title, slogan } from './styles.css'

const Home = (props) => (
  <div className={container}>
    <p className={title}>{'Post it'}</p>
    <p className={slogan}>{'stuff'}</p>
  </div>
)

export default Home;