import { CrudeEmployee, Employee } from "@/types";

export class CrudeEmployeeResponseAdapter {
    private readonly crudeEmployee: CrudeEmployee

    constructor(crudeEmployee: CrudeEmployee) {
        this.crudeEmployee = crudeEmployee
    }

    public convert = (): Employee => {
        const {
            id,
            employee_name: name,
            employee_age: age,
            employee_salary: salary,
            profile_image,
        } = this.crudeEmployee
        
        return {
            id,
            name,
            age,
            salary,
            profile_image,
        }
    }
}