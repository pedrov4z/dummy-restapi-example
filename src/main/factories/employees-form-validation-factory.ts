import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

export const makeEmployeeValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().minLen(3).build(),
    ...ValidationBuilder.field('age').required().minNum(18).build(),
    ...ValidationBuilder.field('salary').required().build()
  ])
}