import { ManagerDTO } from "./ManagerDTO";

export interface EmployeeDTO extends ManagerDTO {
    managerId: string,
}

