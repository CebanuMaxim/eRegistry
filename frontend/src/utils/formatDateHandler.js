export const dateFormatToISO = (date) => {
  const [day, month, year] = date.split('.')
  date = `${year}-${month}-${day}`
  return date
}

export const dateFormatToMD = (date) => {
  const [year, month, day] = date.split('-')
  date = `${day}.${month}.${year}`
  return date
}
