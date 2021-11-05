import { db } from './../database/index'
export const Donation = {
  getAll: () => {
    const QUERY = `
      SELECT
      D.id,
      D.nombre,
      D.monto,
      D.foto_donacion,
      D.esta_facturado as facturado,
      P.razon_social as donador,
      M.nombre metodo_pago,
      T.nombre tipo_donacion
      FROM
      donaciones D,
      donadores P,
      metodos_pago M,
      tipo_donaciones T
      WHERE
      D.id_donador = P.id
      AND
      D.id_metodo_pago = M.id
      AND
      D.id_tipo_donacion = T.id
      AND
      D.existe = true
      ORDER BY D.id DESC
    `
    return db.query(QUERY)
  },
  getOne: (id) => {
    const QUERY = `
      SELECT
      D.id,
      D.nombre,
      D.monto,
      D.foto_donacion,
      D.esta_facturado,
      P.razon_social,
      M.id metodo_pago,
      T.id tipo_donacion
      FROM
      donaciones D,
      donadores P,
      metodos_pago M,
      tipo_donaciones T
      WHERE
      D.id = $1
      AND
      D.id_donador = P.id
      AND
      D.id_metodo_pago = M.id
      AND
      D.id_tipo_donacion = T.id
      AND
      D.existe = true
      ORDER BY D.id DESC
    `
    return db.query(QUERY, [id])
  },
  postOne: async (donation) => {
    const INSERTION = `
    INSERT INTO donaciones(
      id_donador, id_metodo_pago, id_tipo_donacion, nombre, monto, foto_donacion, esta_facturado
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `
    try {
      await db.query(INSERTION, [donation.id_donador, donation.id_metodo_pago, donation.id_tipo_donacion, donation.nombre, donation.monto, donation.foto_donacion, donation.esta_facturado])
      return ['POST DONATION', 201]
    } catch (error) {
      console.log('ERROR POST DONATION 🤯', error)
      return ['ERROR POST DONATION 🤯', 400]
    }
  },
  putOne: async (donation, id) => {
    const UPDATE = `
      UPDATE donaciones
      SET id_donador = $2, 
      id_metodo_pago = $3, 
      id_tipo_donacion = $4, 
      nombre = $5, 
      monto = $6, 
      foto_donacion = $7, 
      esta_facturado = $8
      WHERE id = $1 
      AND existe = true
    `
    const values = [id, donation.id_donador, donation.id_metodo_pago, donation.id_tipo_donacion, donation.nombre, donation.monto, donation.foto_donacion, donation.esta_facturado]
    try {
      const { rowCount } = await db.query(UPDATE, values)

      if (rowCount === 0) {
        return ['ERROR  UPDATE NOT FOUND', 404]
      }
      return ['UPDATE ONE DONOR', 201]
    } catch (error) {
      console.log('ERROR UPDATE DONOR 🤯', error)
      return ['ERROR UPDATE DONOR 🤯', 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE donaciones
      SET existe = false
      WHERE id = $1
    `
    try {
      const { rowCount } = await db.query(DELETE, [id])

      if (rowCount === 0) {
        return ['ERROR DELETE NOT FOUND', 404]
      }
      return ['DELETE ONE DONATION', 201]
    } catch (error) {
      console.log('ERROR DELETE DONATION 🤯', error)
      return ['ERROR DELETE DONATION 🤯', 400]
    }
  }
}
