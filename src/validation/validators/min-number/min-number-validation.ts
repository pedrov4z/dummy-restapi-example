import { MinNumberError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinNumberValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minNumber: number) {}

  validate (value: string): Error {
    return Number(value) >= this.minNumber ? null : new MinNumberError(this.minNumber)
  }
}
