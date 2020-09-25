/* eslint-disable no-useless-escape */
export const fieldRequired = (field: string, message?: string) => (obj: {
  [field: string]: any
}) => {
  const value: any = obj[field]
  if (value && value.length) {
    return null
  }
  return [field, message || `Field ${field} is required.`]
}

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const fieldMatchesEmailRegex = (
  field: string,
  message?: string
) => (obj: { [field: string]: any }) => {
  const value: any = obj[field]
  if (emailRegex.test(value)) {
    return null
  }
  return [field, message || `${field} must be a valid email.`]
}

export const minLength = (length: number) => (
  field: string,
  message?: string
) => (obj: { [field: string]: any }) => {
  const value: any = obj[field]
  if (value && value.length && value.length >= length) {
    return null
  }
  return [field, message || `Minimum length of field ${field} is ${length}.`]
}

export const maxLength = (length: number) => (
  field: string,
  message?: string
) => (obj: { [field: string]: any }) => {
  const value: any = obj[field]
  if (value && value.length && value.length <= length) {
    return null
  }
  return [field, message || `Maximum length of field ${field} is ${length}.`]
}

export const mustMatchField = (fieldToMatch: string) => (
  field: string,
  message?: string
) => (obj: { [field: string]: any }) => {
  const canonicalValue: any = obj[fieldToMatch]
  const value: any = obj[field]
  if (value === canonicalValue) {
    return null
  }
  return [
    field,
    message || `Value of ${field} must match the value of ${fieldToMatch}.`,
  ]
}

export const createValidator = (
  validators: ((obj: { [field: string]: any }) => any)[]
) => (obj: { [field: string]: any }) =>
  validators.reduce((errors: { [field: string]: string[] }, validator) => {
    const [field, message]: [string, string] = validator(obj) || []
    if (field && message) {
      if (!errors[field]) {
        errors[field] = []
      }
      errors[field].push(message)
    }
    return errors
  }, {})
