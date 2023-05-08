import { Part } from 'src/app/model/part';

export class CustomerMachine {
    constructor(
      public customerID: number,
      public nextService: Date,
      public machineSerialNumber: string,
      public machineID: number,
      public machineName: string,
      public partsMustChange: string,
      public serviceInterval: number,
      public parts: Part[]
    ) {  }
  }