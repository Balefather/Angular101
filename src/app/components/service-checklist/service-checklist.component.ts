import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Part } from 'src/app/model/part';
import { Machine } from 'src/app/model/machine';
import { Customer } from 'src/app/model/customer';
import { PartService } from 'src/app/services/part.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { MachinePartService } from 'src/app/services/machine-part.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-service-checklist',
  templateUrl: './service-checklist.component.html',
  styleUrls: ['./service-checklist.component.css']
})
export class ServiceChecklistComponent implements OnInit{
  parts: Part[] = [];
  customers: Customer[] = [];
  selectedParts: Part[] = [];
  selectedCustomer: Customer | null;
 

  searchResultParts$!: Observable<Part[]>;
  private searchTerms = new Subject<string>();
  searchValue:string = '';

  constructor(private partService: PartService, private messageService: MessageService, private customerService: CustomerService){}

  customerSelected(customer: Customer){
    if(this.selectedCustomer == customer){
      this.selectedCustomer = null;
    }
    else{
      this.selectedCustomer = customer;
    }
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

/*   submitForm(form: NgForm){
    console.log(this.formData);
    form.reset();
  } */

  ngOnInit(): void{
    this.GetParts();
    this.GetCustomers();
    this.initializeSearchResult();
  }



  addToSelection(part: Part): void{
    this.selectedParts.push(part);
    this.messageService.add(`Added ${part.partName} to selection`);
    this.searchValue = '';
    this.clear();
  }

  GetParts(): void {
    this.partService.getParts().subscribe(parts => this.parts = parts);
  }

  GetCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }


  initializeSearchResult(): void{
    this.searchResultParts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.partService.searchParts(term)),
    );
  }

  clear(): void{
    this.searchResultParts$ = new Observable<Part[]>();
    this.initializeSearchResult();

  }

}
