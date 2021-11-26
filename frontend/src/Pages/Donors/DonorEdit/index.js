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

import { NavPage } from '../../../Components/Dashboard/NavPage'
import { Card } from 'react-materialize'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import {
  getOneDonor,
  updateDonor
} from '../../../helpers/donors.helpers'

import './style.scss'
import { convertToSelectOptions, filterSelectsOptiones, formatDateTable, convertToSelectOptionsCFDI } from '../../../utils'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { donorSchema } from '../../../utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'

export const DonorEdit = ({ justView }) => {
  const { id } = useParams()
  const animatedComponents = makeAnimated()
  const [edit, setEdit] = useState(false)
  const [foreign, setForeign] = useState(false);
  const [options, setOptions] = useState({
    states: [],
    cfdis: [],
    regimen_fiscal: [{
      label: 'PERSONA MORAL',
      value: true
    },
    {
      label: 'PERSONA FISICA',
      value: false
    }
    ]
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(donorSchema)
  })

  useEffect(() => {
    const getOne = async () => {
      try {
        const response = await getOneDonor(id)
        console.log(response)
        setForeign((!response.id_cfdi ? true : false))

        setOptions({
          ...options,
          states: convertToSelectOptions(response.estados),
          cfdis: convertToSelectOptionsCFDI(response.cfdis)
        })

        const initialStateForm = {
          telefono: response.donor.telefono,
          razon_social: response.donor.razon_social,
          rfc: response.donor.rfc,
          nombre: response.donor.nombre,
          correo_electronico: response.donor.correo_electronico,
          domicilio_fiscal: response.donor.domicilio_fiscal,
          codigo_postal: response.donor.codigo_postal,
          regimen_fiscal: {
            label: response.donor.regimen_fiscal ? 'PERSONA MORAL' : 'PERSONA FISICA',
            value: response.donor.regimen_fiscal
          },
          id_estado: filterSelectsOptiones(
            response.estados,
            [{ id: response.donor.id_estado }],
            'nombre'
          )[0],
          id_cfdi: filterSelectsOptiones(
            response.cfdis,
            [{ id: response.donor.id_cfdi }],
            'descripcion'
          )[0]
        }
        console.log(response)
        console.log(initialStateForm)
        reset(initialStateForm)
      } catch (error) {
        console.log(error)
        setEdit(null)
      }
    }
    getOne()
  }, [id, edit])

  // Use Effect for selects info

  const handlerSubmit = async (data) => {
    try {
      console.log('🐊', data)
      const updateData = {
        telefono: data.telefono,
        razon_social: data.razon_social,
        rfc: data.rfc,
        nombre: data.nombre,
        correo_electronico: data.correo_electronico,
        domicilio_fiscal: data.domicilio_fiscal,
        codigo_postal: data.codigo_postal,
        regimen_fiscal: data.regimen_fiscal.value,
        id_estado: foreign ? null : data.id_estado.value,
        id_cfdi: foreign ? null : data.id_cfdi.value
      }
      console.log('😀', updateData)

      await updateDonor(updateData, id)
      toastInit('Elemento actualizado')
      setEdit(!edit)
    } catch (error) {
      console.log(error)
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
      <NavPage title='Editar donador' justView={justView} detail='donador' />
      <Card className='hoverable'>
        <h6 className='teal-text'>Información</h6>
        <form
          className='user__form '
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <div>
            <label>Número de Teléfono</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('telefono')
              }
              disabled={!edit} />
            {errors.telefono &&
              (<span className='red-text'>
                {
                  errors.telefono.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Razón Social</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('razon_social')
              }
              disabled={!edit} />
            {errors.razon_social &&
              (<span className='red-text'>
                {
                  errors.razon_social.message
                }
              </span>)
            }
          </div>
          <div>
            <label>RFC</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('rfc')
              }
              disabled={!edit} />
            {errors.rfc &&
              (<span className='red-text'>
                {
                  errors.rfc.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Nombre del donador</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('nombre')
              }
              disabled={!edit} />
            {errors.nombre &&
              (<span className='red-text'>
                {
                  errors.nombre.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Correo Electrónico</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('correo_electronico')
              }
              disabled={!edit} />
            {errors.correo_electronico &&
              (<span className='red-text'>
                {
                  errors.correo_electronico.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Domicilio Fiscal</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('domicilio_fiscal')
              }
              disabled={!edit} />
            {errors.domicilio_fiscal &&
              (<span className='red-text'>
                {
                  errors.domicilio_fiscal.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Código Postal</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('codigo_postal')
              }
              disabled={!edit} />
            {errors.codigo_postal &&
              (<span className='red-text'>
                {
                  errors.codigo_postal.message
                }
              </span>)
            }
          </div>
          {/* SELECT REGIMEN FISCAL */}
          <div className='input-select'>
            <label>Selecciona el régimen fiscal</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona un régimen fiscal'
                }
              }}
              name='regimen_fiscal'
              render={({ field }) => (
                <Select
                  placeholder='Régimen Fiscal'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.regimen_fiscal}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.regimen_fiscal &&
              (<span
                className='red-text'
              >
                {errors.regimen_fiscal.message}
              </span>)
            }
          </div>
          {
            !foreign && (<>
              {/* SELECT ESTADO */}
              <div className='input-select'>
                <label>Selecciona un Estado</label>
                <Controller
                  control={control}
                  name='id_estado'
                  render={({ field }) => (
                    <Select
                      placeholder='Estado'
                      closeMenuOnSelect
                      components={animatedComponents}
                      options={options.states}
                      {...field}
                      isDisabled={!edit}
                    />
                  )}
                />
                {errors.id_estado &&
                  (<span
                    className='red-text'
                  >
                    {errors.id_estado.message}
                  </span>)
                }
              </div>
              {/* SELECT CFDI */}
              <div className='input-select'>
                <label>Selecciona un CFDI</label>
                <Controller
                  control={control}
                  name='id_cfdi'
                  render={({ field }) => (
                    <Select
                      placeholder='CFDI'
                      closeMenuOnSelect
                      components={animatedComponents}
                      options={options.cfdis}
                      {...field}
                      isDisabled={!edit}
                    />
                  )}
                />
                {errors.id_cfdi &&
                  (<span
                    className='red-text'
                  >
                    {errors.id_cfdi.message}
                  </span>)
                }
              </div>
            </>)
          }

          {/* BOTONES DE OPCIONES */}
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
            </div>)
          }
        </form>
      </Card>
    </>
  )
}
