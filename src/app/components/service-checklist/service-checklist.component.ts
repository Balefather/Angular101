import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Part } from 'src/app/model/part';
import { Machine } from 'src/app/model/machine';
import { Customer } from 'src/app/model/customer';
import { PartService } from 'src/app/services/models/part/part.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { MachineService } from 'src/app/services/models/machine/machine.service';
import { CustomerService } from 'src/app/services/models/customer/customer.service';

@Component({
  selector: 'app-service-checklist',
  templateUrl: './service-checklist.component.html',
  styleUrls: ['./service-checklist.component.css']
})
export class ServiceChecklistComponent implements OnInit{
  constructor(private partService: PartService, private messageService: MessageService, private customerService: CustomerService){}

  

  customers: Customer[] = [];
  selectedCustomer: Customer | null;
 

  customerSelected(customer: Customer){
    if(this.selectedCustomer == customer){
      this.selectedCustomer = null;
    }
    else{
      this.selectedCustomer = customer;
    }
  }

  ngOnInit(): void{
    this.GetCustomers();
  }

  GetNextServiceFromCustomer(customer: Customer): Date{
    // use map() to extract the timestamps from the objects
    const timestamps = customer.machines.map(obj => Date.parse(obj.nextService.toString()));
    
    // use Math.min() to find the earliest timestamp
    const earliestTimestamp = Math.min(...timestamps);
    
    // create a new Date object from the earliest timestamp
    const earliestDate = new Date(earliestTimestamp);

    return earliestDate;
  }

  GetCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      customers.forEach(customer => {
        customer.machines.sort((a, b) => {
          const dateA = new Date(a.nextService).getTime();
          const dateB = new Date(b.nextService).getTime();
          return dateA - dateB;
        });
      });
      this.customers = customers;
    });
  }
}
