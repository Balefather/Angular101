export class MachinePart {
    constructor(
      public machineID: number,
      public machineName: string,
      public partID: number,
      public partName: string,
      public amountPartMachine: number,
      public numberInStock: number,
      public partPrice: number
    ) {  }
  }