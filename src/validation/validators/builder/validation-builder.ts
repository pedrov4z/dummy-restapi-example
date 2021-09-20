import { FieldValidation } from '@/validation/protocols/field-validation'
import { MinLengthValidation, MinNumberValidation, RequiredFieldValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) { }

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  minNum (number: number): ValidationBuilder {
    this.validations.push(new MinNumberValidation(this.fieldName, number))
    return this
  }

  minLen (length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
