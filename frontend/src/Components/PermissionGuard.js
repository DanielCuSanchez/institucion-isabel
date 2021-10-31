import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './../hooks/useAuth'

export const PermissionGuard = (props) => {
  const { children, permiso } = props
  const auth = useAuth()
  const location = useLocation()
  const [requestedLocation, setRequestedLocation] = useState(null)
  if (!(auth.user.permisos.some(p => p.nombre === permiso))) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname)
    }

    return <Navigate to='/dashboard/permisos' />
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation} />
  }

  return <>{children}</>
}
