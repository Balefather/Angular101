export class service {
    constructor(
      public sartID: number,
      public customerID: number,
      public machineID: number,
      public serviceDate: Date,
      public partsUsed: string,
      public transportTimeUsed: number,
      public transportKmUsed: number,
      public workTimeUsed: number,
      public imagePath: string
    ) {  }
  }