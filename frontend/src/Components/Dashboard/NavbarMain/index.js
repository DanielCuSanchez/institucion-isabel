
import { useAuth } from '../../../hooks/useAuth'
import { Navbar, NavItem, Icon, Dropdown, Divider } from 'react-materialize'
import { Link } from 'react-router-dom'
import './style.scss'

export const NavbarMain = () => {
  const auth = useAuth()
  const handlerLogout = () => {
    auth.logout()
  }

  return (
    <>
      <Navbar
        className='navbar'
        alignLinks='right'
        brand={
          <Link to='/dashboard' className='brand-logo'>
            Institución Isabel
          </Link>
        }
        sidenav={null}
        fixed
        options={{
          draggable: false,
          edge: 'left',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true
        }}
      >

        <Dropdown
          id='Dropdown_14'
          options={{
            alignment: 'left',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250
          }}
          trigger={<a href='#!'>{auth.user.nombre} {auth.user.apellido}{' '}<Icon right>arrow_drop_down</Icon></a>}
        >
          <NavItem onClick={handlerLogout}>
            Cerrar sesión
          </NavItem>
          <Divider />
          <Link to='/dashboard/perfil'>
            Mi cuenta
          </Link>
        </Dropdown>
      </Navbar>

    </>
  )
}
