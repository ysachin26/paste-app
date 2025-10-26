import React from 'react'
import { NavLink } from 'react-router'
export const Navbar = () => {
  return (
    <div className='place-content-evenly flex flex-row mt-8'>
      <NavLink to="/">Home</NavLink>
       <NavLink to="/pastes">Pastes</NavLink>
    </div>
  )
}

 
