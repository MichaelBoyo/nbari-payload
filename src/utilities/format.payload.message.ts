export const formatPayloadMessage = (message: string) => {
  switch (message) {
    case 'The following field is invalid: email':
      return 'Email already registered'

    default:
      return message
  }
}
