import { Machine } from 'src/app/model/machine';
import { CustomerMachine } from './customerMachine';

export class Customer {
    constructor(
      public customerID: number,
      public customerName: string,
      public customerAddress: string,
      public phoneNumber: string,
      public email: string,
      public machines: CustomerMachine[]
    ) {  }
  }