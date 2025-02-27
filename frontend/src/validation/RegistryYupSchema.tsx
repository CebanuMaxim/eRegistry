import * as yup from 'yup'
import moment from 'moment'
import { CreateErrorOptions, TestContext } from 'yup'

const customDateValidator = (
  value: string | undefined,
  context: TestContext
) => {
  const date = moment(value, 'DD.MM.YYYY', true)
  if (!date.isValid()) {
    return context.createError({
      message: 'This must be a valid date in DD.MM.YYYY format',
      path: context.path,
    } as CreateErrorOptions)
  }
  return true
}

const RegistrySchema = yup.object().shape({
  registryIndex: yup
    .string()
    .matches(/^\d+$/, 'typographyId must be a digit number')
    .required('Registry Index is required'),
  typographyId: yup
    .string()
    .matches(/^\d{7}$/, 'typographyId must be a 7-digit number')
    .required('Typography Id is required'),
  registryId: yup
    .string()
    .matches(/^\d{4}$/, 'typographyId must be a 4-digit number')
    .required('Registry Id is required'),
  startDate: yup
    .string()
    .test('custom-date-validation', 'Invalid date', customDateValidator)
    .required(),
  endDate: yup
    .string()
    .test('custom-date-validation', 'Invalid date', customDateValidator)
    .required(),
})

export default RegistrySchema
