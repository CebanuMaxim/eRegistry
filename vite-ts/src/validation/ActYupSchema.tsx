import * as yup from 'yup'
import moment from 'moment'
import { TestContext } from 'yup'

const customDateValidator = (
  value: string | undefined,
  context: TestContext
) => {
  if (!value) {
    return context.createError({
      message: 'Date is required',
      path: context.path,
    })
  }

  const date = moment(value, 'DD.MM.YYYY', true)
  if (!date.isValid()) {
    return context.createError({
      message: 'This must be a valid date in DD.MM.YYYY format',
      path: context.path,
    })
  }
  return true
}

const ActSchema = yup.object().shape({
  actId: yup
    .string()
    .matches(/^\d+$/, 'act ID must be a string with digits only')
    .required('act ID is required'),
  date: yup
    .string()
    .test('custom-date-validation', 'Invalid date', customDateValidator)
    .required(),
  lastname: yup.string().required(),
  firstname: yup.string().required(),
  idnp: yup
    .string()
    .matches(/^\d{13}$|^UKR-[A-Z]{2}-\d{6}$/, 'IDNP must be a 13-digit number'),
  stateFee: yup.number().required(),
  notaryFee: yup.number().required(),
  registry: yup.string(),
  _id: yup.string(),
  __v: yup.number(),
})

export default ActSchema
