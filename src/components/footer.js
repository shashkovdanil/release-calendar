import React from 'react'
import logo from '../assets/images/logo.png'

function Footer() {
  return (
    <footer>
      <a className="vk" href="https://vk.com/deaddinos">
        vk.com/deaddinos
      </a>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <a className="tg" href="https://t.me/deaddinos">
        t.me/deaddinos
      </a>
    </footer>
  )
}

export default Footer
