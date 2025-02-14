import React from 'react'
import { useName } from '../hooks/useName';
import { Navigate } from 'react-router';

function PublicRoute( {children} ) {
  const {name} = useName();

  if ( name) {
   return <Navigate to="/pokedex" />
  }
  
  return children ? children : <Outlet />
}

export default PublicRoute