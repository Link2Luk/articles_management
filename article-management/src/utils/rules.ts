type passwordOptionsType = {
  digit?: boolean // use at least 1 digit
  letter?: boolean // use at least 1 letter, case insensitive
  upper?: boolean // use at least 1 uppercase letter
  special?: boolean // use at least 1 sepcial character: @$!%*?&
}
export const getPasswordRegExp = (min = 0, max = 0, options: passwordOptionsType = {}) => {
  // here to set the default min and max number of characters
  const defaultMin = 8
  const defaultMax = 16
  min = min <= 0 ? defaultMin : min
  max = max <= 0 ? defaultMax : max
  // ensure min <= max
  if (min > max) {
    const tmp = max
    max = min
    min = tmp
  }
  const { digit = true, letter = true, upper = false, special = false } = options
  // the character sets that can be used in the passwords
  const specialChars = '@$!%*?&'
  const base = `[\\dA-Za-z${specialChars}]{${min},${max}}`
  const result = [
    {
      pattern: RegExp(`^${base}$`),
      message: `Use ${min}-${max} letters, numbers and ${specialChars}`
    }
  ]
  if (digit)
    result.push({
      pattern: RegExp(`^(?=.*\\d)${base}$`),
      message: `Use at least 1 digit`
    })
  if (letter)
    result.push({
      pattern: RegExp(`^(?=.*[A-Za-z])${base}$`),
      message: `Use at least 1 letter`
    })
  if (upper)
    result.push({
      pattern: RegExp(`^(?=.*[A-Z])${base}$`),
      message: `Use at least 1 uppercase letter`
    })
  if (special)
    result.push({
      pattern: RegExp(`^(?=.*[@$!%*?&])${base}$`),
      message: `Use at least 1 special character`
    })
  return result
}


