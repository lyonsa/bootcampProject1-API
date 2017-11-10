import boom, { badImplementation } from 'boom'

export default ($err, req, res, next) => {
	// get boom error
	// convert to error 500 if not boom error
  const err = $err.isBoom ? $err : badImplementation('Something broke ):')
  const { message, statusCode, error } = err.output.payload
  // log error
	console.error(`${error}: ${message}`)
	console.error($err.stack)
  res.status(statusCode).json({
    error,
    message,
  })
}
