const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationStyles = {
    background: 'lightgray',
    borderRadius: 5,
    borderStyle: 'solid',
    color: type === 'success' ? 'green' : 'red',
    fontSize: 20,
    marginBottom: 10,
    padding: 10,
  }

  return <div style={notificationStyles}>{message}</div>
}

export default Notification
