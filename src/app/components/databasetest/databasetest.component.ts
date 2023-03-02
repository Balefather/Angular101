import { Component, OnInit } from '@angular/core';
/* import { OracleService } from '../services/oracle-db.service'; */

@Component({
  selector: 'app-databasetest',
  templateUrl: './databasetest.component.html',
  styleUrls: ['./databasetest.component.css']
})

export class DatabasetestComponent implements OnInit{

  data?: any[];

  constructor(/* private oracleService: OracleService */) {}

  async ngOnInit() {
/*     const result = await this.oracleService.executeQuery('SELECT * FROM tblParts');

    this.data = result.rows; */
  }
}
