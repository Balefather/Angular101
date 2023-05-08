import { ServicePart } from "./servicePart";
export interface ServiceInterface {
  serviceID: number
  serviceDate: Date
  customerName: string
  machineName: string
  machineSerialNumber: string
  parts: Part[]
  images: Image[]
  transportTimeUsed: number
  transportKmUsed: number
  workTimeUsed: number
  note: string
  machineStatus: string
}

export interface Part {
  partsUsed: number
  partID: number
  partName: string
  numberInStock: number
  partPrice: number
}

export interface Image {
  imageID: number
  imagePath: string
}

export class Service implements ServiceInterface {
  constructor(
    public serviceID: number,
    public serviceDate: Date,
    public customerName: string,
    public machineName: string,
    public machineSerialNumber: string,
    public parts: Part[],
    public images: Image[],
    public transportTimeUsed: number,
    public transportKmUsed: number,
    public workTimeUsed: number,
    public note: string,
    public machineStatus: string
  ) {}
}

