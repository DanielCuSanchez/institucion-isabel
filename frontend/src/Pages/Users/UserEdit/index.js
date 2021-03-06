import {
  getAllRoles,
  getOneUser,
  updateUser
} from '../../../helpers/users.helpers'
import {
  useEffect,
  useState
} from 'react'
import {
  Navigate,
  useParams
} from 'react-router-dom'
import {
  Controller,
  useForm
} from 'react-hook-form'

import './style.scss'
import { NavPage } from '../../../Components/Dashboard/NavPage'
import { ModalPassword } from '../../../Components/Dashboard/ModalPassword'
import { useAuth } from '../../../hooks/useAuth'
import { Card } from 'react-materialize'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { toastInit } from '../../../Components/Dashboard/AlertToast'

export const UserEdit = ({ justView }) => {
  const auth = useAuth()
  const { id } = useParams()
  const animatedComponents = makeAnimated()
  const [edit, setEdit] = useState(false)
  const [fetchUpdate, setFetchUpdate] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [roles, setRoles] = useState([])
  const {
    register,
    handleSubmit,
    reset, control,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getOneUser(id)
        const optionRolesSelected = user.roles.map(role => {
          return {
            label: role.nombre,
            value: role.id
          }
        })
        const userData = {
          ...user,
          roles: optionRolesSelected
        }
        reset(userData)
      } catch (error) {
        setEdit(null)
      }
    }
    getUser()
  }, [id, edit])

  useEffect(() => {
    const getRoles = async () => {
      const roles = await getAllRoles()
      const options = roles.map(r => {
        return {
          value: r.id,
          label: r.nombre_role
        }
      })

      setRoles(options)
    }
    getRoles()
  }, [])
  const handlerSubmit = async (data) => {
    try {
      const roles = data.roles.map(role => {
        return {
          id: role.value,
          nombre: role.label
        }
      })
      const dataPost = {
        ...data,
        roles
      }
      await updateUser(dataPost, id)
      if (Number(id) === auth.user.id) {
        await auth.updateUserContext()
      }
      setFetchUpdate(!fetchUpdate)
      toastInit('Elemento actualizado')
      setEdit(false)
    } catch (error) {
      console.log(error, 'Update user')
      toastInit('Error al actualizar', 'red lighten-2')
    }
  }
  const handlerEdit = () => {
    setEdit(!edit)
  }
  if (edit === null) {
    return <Navigate to='/dashboard/NOTFOUND' />
  }
  return (
    <>
      <NavPage title='Editar usuario' justView={justView} detail='usuario' />
      <Card className='hoverable'>
        <p>Informaci??n de usuario</p>
        <form
          className='user__form'
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <div>
            <label>Nombre</label>
            <input
              onChange={register}
              type='text'
              name='nombre'
              {
              ...register('nombre', {
                required: true
              })
              }
              disabled={!edit} />
            {errors.nombre?.type === 'required' &&
              (<span className='red-text'>El nombre es requerido</span>)
            }
          </div>
          <div>
            <label>Apellidos</label>
            <input
              onChange={register}
              type='text'
              name='apellido'
              {...register('apellido', {
                required: true
              })}
              disabled={!edit}
            />
            {errors.apellido?.type === 'required' &&
              (<span className='red-text'>El apellido es requerido</span>)
            }
          </div>

          <div className='input-select'>
            <label>Selecciona los roles</label>
            <Controller
              control={control}
              rules={{ required: true }}
              name='roles'

              render={({ field }) => (
                <Select
                  placeholder='Roles de usuario'
                  closeMenuOnSelect
                  components={animatedComponents}
                  isMulti
                  options={roles}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.roles?.type === 'required' &&
              (<span
                className='red-text'
              >
                Selecciona al menos un role
              </span>)
            }
          </div>

          <div>
            <label>Email</label>
            <input
              onChange={register}
              type='text'
              name='correo_electronico'
              {...register('correo_electronico', {
                required: {
                  value: true,
                  message: 'El correo electronico es requerido'
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Ingresa un correo v??lido. Revisa los espacios'
                }
              })}
              disabled={!edit}
            />
            {errors.correo_electronico &&
              (<span className='red-text'>
                {errors.correo_electronico.message}
              </span>)
            }
          </div>

          {
            !justView && (<div className='user__btn__container'>
              <button
                type='submit'
                className='btn btn-success  '
                disabled={!edit}
              >
                Actualizar
              </button>

              <button
                type='button'
                className={`btn ${edit ? 'red' : 'teal'} `}
                onClick={handlerEdit}
              >
                {
                  edit ? 'Cancelar' : 'Editar'
                }
              </button>
              <button type='button' className='btn indigo'
                onClick={() => setActiveModal(!activeModal)}>
                Reestablecer contrase??a
              </button>
            </div>)
          }
        </form>
      </Card>
      {
        activeModal && (<ModalPassword id={id} changeVisibility={setActiveModal} />)
      }
    </>
  )
}
