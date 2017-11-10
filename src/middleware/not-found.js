import { notFound } from 'boom'

export default (req, res, next) => {
  next(notFound('The endpoint you requested was not found.'))
}
