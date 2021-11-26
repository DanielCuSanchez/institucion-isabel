/* eslint-disable no-useless-escape */
import {
  useEffect,
  useState
} from 'react'
import {
  Navigate
} from 'react-router-dom'
import {
  Controller,
  useForm
} from 'react-hook-form'

import { NavPage } from '../../../Components/Dashboard/NavPage'
import { Card } from 'react-materialize'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { postDonor } from '../../../helpers/donors.helpers'

import './style.scss'
import { convertToSelectOptions, convertToSelectOptionsCFDI } from '../../../utils'
import { getAllStates } from '../../../helpers/states.helpers'
import { getAllCfdis } from './../../../helpers/cfdis.helpers'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { donorSchema } from '../../../utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'

export const DonorAdd = () => {
  const animatedComponents = makeAnimated()
  const [edit, setEdit] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isForeign, setIsForeign] = useState(false)
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
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(donorSchema)
  })

  useEffect(() => {
    const getInfoSelects = async () => {
      try {
        const estados = await getAllStates()
        const cfdis = await getAllCfdis()

        setOptions({
          ...options,
          states: convertToSelectOptions(estados),
          cfdis: convertToSelectOptionsCFDI(cfdis)
        })
      } catch (error) {
        console.log(error)
        toastInit('Error al cargar la página', 'red lighten-2')
        setEdit(null)
      }
    }
    getInfoSelects()
  }, [edit])

  // Use Effect for selects info

  const handlerSubmit = async (data) => {
    try {
      setLoading(true)
      setEdit(false)
      const dataPost = {
        donor: {
          telefono: data.telefono,
          razon_social: data.razon_social,
          rfc: data.rfc,
          nombre: data.nombre,
          correo_electronico: data.correo_electronico,
          domicilio_fiscal: data.domicilio_fiscal,
          codigo_postal: data.codigo_postal,
          regimen_fiscal: data.regimen_fiscal.value,
          id_estado: data.id_estado.value || null,
          id_cfdi: data.id_cfdi.value || null
        }
      }
      await postDonor(dataPost)
      toastInit('Elemento agregado')
      setEdit(true)
      setLoading(false)
      resetForm()
    } catch (error) {
      console.log(error)
      toastInit('Error al agregar', 'red lighten-2')
      setEdit(true)
      resetForm()
      setLoading(false)
    }
  }

  const resetForm = () => {
    reset({})
    setValue('id_estado', 'value', { shouldDirty: true })
    setValue('id_cfdi', 'value', { shouldDirty: true })
  }

  const handlerIsForeign = (type) => {
    switch (type) {
      case "foreign":
        setIsForeign(true)
        break
      case "noForeign":
        setIsForeign(false)
        break
      default:
        setIsForeign(false)
    }
  }

  if (edit === null) {
    return <Navigate to='/dashboard/NOTFOUND' />
  }

  return (
    <>
      <NavPage title='Agregar donador' path='/dashboard/donadores' />
      <Card className='hoverable'>
        <h6 className='teal-text'>Información del donador</h6>

        <div className="card donador-extranjero">
          <p>¿El donador es extranjero?</p>
          <div className="donador-extranjero-botones">

            <button
              className="btn"
              disabled={!isForeign}
              onClick={() => handlerIsForeign("noForeign")}
            >No
            </button>
            <button
              className="btn"
              disabled={isForeign}
              onClick={() => handlerIsForeign("foreign")}
            >Si
            </button>
          </div>
        </div>

        <form
          className='user__form '
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <div>
            <label>{isForeign ? "Registro fiscal extranjero" : "RFC Méxicano"}</label>
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
            <label>Número de teléfono</label>
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
          {/* SELECT ESTADO */}
          {
            !isForeign && (<>


              <div className='input-select'>
                <label>Selecciona el estado</label>
                <Controller
                  defaultValue={false}
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
                  defaultValue={false}
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
              </div></>)
          }
          {/* BOTONES DE OPCIONES */}
          <div className='user__btn__container'>
            <button
              type='submit'
              className='btn btn-success  '
              disabled={loading || !edit}
            >
              Agregar donador
            </button>
          </div>
          {
            loading && (
              <div className='progress'>
                <div className='indeterminate' />
              </div>
            )
          }
        </form>
      </Card>
    </>
  )
}
