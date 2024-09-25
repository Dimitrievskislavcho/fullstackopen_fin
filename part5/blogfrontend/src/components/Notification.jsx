import { Alert } from 'react-bootstrap'

const typeToVariantMap = {
  success: 'success',
  error: 'danger',
}

const Notification = ({ data: { message, type } }) => {
  if (message === null) {
    return null
  }

  return <Alert variant={typeToVariantMap[type]}>{message}</Alert>
}

export default Notification
