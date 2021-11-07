export const formatDateTable = (date) => {
  const format = date.split('T').join(' ').split('.000Z')
  return format
}
export const formatKeyTable = (key) => {
  const format = key.replace(/_/g, ' ').toUpperCase()
  return format
}

export const filterSelectsOptiones = (arrCatalogo, arrIds, key) => {
  const filterData = []
  for (const element of arrCatalogo) {
    for (const object of arrIds) {
      if (element.id === object.id) {
        filterData.push({
          label: element[key],
          value: element.id
        })
      }
    }
  }
  return filterData
}

export const convertToSelectOptions = (arr, key = 'nombre') => {
  return arr.map(value => {
    if (key === 'razon_social') {
      return {
        label: `${value[key]} - ${value.nombre} `,
        value: value.id
      }
    }

    return {
      label: value[key],
      value: value.id
    }
  })
}
