import { StringMatcher } from "cypress/types/net-stubbing";

export class customerMachinePart {
    constructor(
      public customerID: number,
      public customerName: string,
      public customerAddress: string,
      public phoneNumber: string,
      public email: string,
      public machineID: number,
      public machineName: string,
      public amountMachines: number,
      public partsMustChange: string,
      public serviceInterval: number,
      public partID: number,
      public partName: string,
      public amountPartMachine: number,
      public numberInStock: number,
      public partPrice: number

    ) {  }
  }