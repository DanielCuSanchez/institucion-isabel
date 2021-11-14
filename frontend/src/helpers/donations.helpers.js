import Axios from 'axios'
const URL_API = 'http://localhost:4000'
export const getAllDonations = async () => {
  const { data } = await Axios.get(`${URL_API}/donations`)
  return data.response
}

export const getOneDonation = async (id) => {
  const { data } = await Axios.get(`${URL_API}/donations/${id}`)
  return data.response
}

export const postDonation = async ({ donation, foto_donacion }) => {
  const form = new FormData()
  form.append('foto_donacion', foto_donacion)
  form.append('donation', JSON.stringify(donation))
  const { data } = await Axios.post(`${URL_API}/donations`, form, {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    }
  })
  return data.response
}
export const updateDonation = async (donation, id) => {
  const { data } = await Axios.put(`${URL_API}/donations/${id}`, donation)
  return data.response
}
