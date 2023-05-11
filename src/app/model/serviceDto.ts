import { ServicePart } from "./servicePart";
export class ServiceDto {
  constructor(
    public serviceID: number,
    public customerID: number,
    public machineID: number,
    public machineSerialNumber: string,
    public serviceParts: Part[],
    public transportTimeUsed: number,
    public transportKmUsed: number,
    public workTimeUsed: number,
    public note: string,
    public machineStatus: string
  ) {}
}

export class Part{
  constructor(
    public partID: number,
    public partsUsed: number
  ){}

}

