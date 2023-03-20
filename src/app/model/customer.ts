import { Machine } from 'src/app/model/machine';

export class Customer {
    constructor(
      public customerID: number,
      public customerName: string,
      public customerAddress: string,
      public phoneNumber: string,
      public email: string,
      public amountMachine: number,
      public machines: Machine[]
    ) {  }
  }