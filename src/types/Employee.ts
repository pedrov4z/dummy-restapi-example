export interface CrudeEmployee {
    id: number,
    employee_name: string,
    employee_salary: number,
    employee_age: number,
    profile_image?: string,
}

export interface Employee {
    id: number,
    name: string,
    salary: number,
    age: number,
    profile_image?: string,
}