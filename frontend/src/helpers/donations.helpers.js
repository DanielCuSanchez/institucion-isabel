import Axios from 'axios'
export const getAllDonationsByRange = async ({ startDate, endDate }) => {
  const URL = `/donations?startDate=${startDate}&endDate=${endDate}`
  console.log(URL)
  const { data } = await Axios.get(URL)
  return data.response
}

export const getAllDonations = async () => {
  const { data } = await Axios.get('/donations')
  return data.response
}

export const getAllDonationsPagination = async ({ limit, offset }) => {
  const { data } = await Axios.get(`/donations?limit=${limit}&offset=${offset}`)
  return data.response
}
export const getOneDonation = async (id) => {
  const { data } = await Axios.get(`/donations/${id}`)
  return data.response
}

export const postDonation = async ({ donation, foto_donacion }) => {
  const form = new FormData()
  form.append('foto_donacion', foto_donacion)
  if (foto_donacion !== null) {
    form.append('donation', JSON.stringify(donation))
  }
  const { data } = await Axios.post('/donations', form, {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    }
  })
  return data.response
}
export const updateDonation = async (donation, id) => {
  const form = new FormData()
  form.append('foto_donacion', donation.foto_donacion)
  form.append('donation', JSON.stringify(donation.data))
  const { data } = await Axios.put(`/donations/${id}`, form)
  return data.response
}

export const deletePhotoDonation = async (id) => {
  const { data } = await Axios.delete(`/donations/${id}/photos`)
  return data.response
}
export const updateOneDonationInvoce = async (id, dataInvoice) => {
  const { data } = await Axios.put(
    `/donations/${id}/invoices`,
    dataInvoice
  )
  return data.response
}
