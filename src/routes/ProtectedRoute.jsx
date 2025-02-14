import React, { Children } from 'react'
import { useName } from '../hooks/useName';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute( {children} ) {
  const {name} = useName();

  if (!name) {
    return <Navigate to="/" />
  }


  return children ? Children : <Outlet />
  
}

export default ProtectedRoute