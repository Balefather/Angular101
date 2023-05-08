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
import { Service } from 'src/app/model/service';
import { ServiceService } from 'src/app/services/models/service/service.service';
import { ServicePart } from 'src/app/model/servicePart';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit{
  constructor(
    private partService: PartService, 
    private messageService: MessageService, 
    private customerService: CustomerService,
    private serviceService: ServiceService)
  {
    
  }

  service: Service = new Service(0, new Date(), "", "", "", [], [], 0, 0, 0, "", "");
  
  parts: Part[] = [];
  customers: Customer[] = [];
  selectedParts: Part[] = [];
  selectedCustomer: Customer | null;
 

  searchResultParts$!: Observable<Part[]>;
  private searchTerms = new Subject<string>();
  searchValue:string = '';


  customerSelected(customer: Customer){
    if(this.selectedCustomer == customer){
      this.selectedCustomer = null;
    }
    else{
      this.selectedCustomer = customer;
    }
  }

  createService(){

  }

/*   search(term: string): void {
    this.searchTerms.next(term);
  } */

/*   submitForm(form: NgForm){
    console.log(this.formData);
    form.reset();
  } */

  ngOnInit(): void{
    this.GetCustomers();
/*     this.GetParts();

    this.initializeSearchResult(); */
  }



/*   addToSelection(part: Part): void{
    this.selectedParts.push(part);
    this.messageService.add(`Added ${part.partName} to selection`);
    this.searchValue = '';
    this.clear();
  } */

/*   GetParts(): void {
    this.partService.getParts().subscribe(parts => this.parts = parts);
  } */

  GetCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }


/*   initializeSearchResult(): void{
    this.searchResultParts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.partService.searchParts(term)),
    );
  } */

/*   clear(): void{
    this.searchResultParts$ = new Observable<Part[]>();
    this.initializeSearchResult();

  } */

}
