import { Part } from "./part";

export class ServicePart extends Part {
  constructor(
    public partsUsed: number, 
    partID: number, 
    partName: string, 
    numberInStock: number, 
    partPrice: number, 
    amountPartMachine: number) 
    {
    super(partID, partName, numberInStock, partPrice, amountPartMachine);
  }
}