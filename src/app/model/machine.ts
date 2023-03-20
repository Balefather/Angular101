import { Part } from 'src/app/model/part';

export class Machine {
    constructor(
      public machineID: number,
      public machineName: string,
      
      public partsMustChange: string,
      public serviceInterval: number,
      public parts: Part[]
    ) {  }
  }