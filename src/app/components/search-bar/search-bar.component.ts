import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap, mergeMap
 } from 'rxjs/operators';

import { Part } from '../../model/part';
import { PartService } from '../../services/models/part/part.service';

import { Machine } from '../../model/machine';
import { MachineService } from '../../services/models/machine/machine.service';

import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/models/customer/customer.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: [ './search-bar.component.css' ]
})
export class SearchBarComponent implements OnInit, OnDestroy {
  parts$!: Observable<Part[]>;
  customers$!: Observable<Customer[]>;
  machines$!: Observable<Machine[]>;


  private searchTerms = new Subject<string>();
  searchValue: string = '';
  constructor(private machineService: MachineService, private customerService: CustomerService, private partService: PartService, private elementRef: ElementRef) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
    this.setDebounceTime(300);
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.searchValue = '';
      this.setDebounceTime(0);
      this.search(this.searchValue)
      this.setDebounceTime(300);
    }
    else {
      this.searchValue = '';
      this.setDebounceTime(0);
      this.search(this.searchValue)
      this.setDebounceTime(300);
    }

  }

  setDebounceTime(ms: number) {
    const search$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(ms),
  
      // ignore new term if same as previous term
      distinctUntilChanged()
    );
  
    this.parts$ = search$.pipe(
      // switch to new search observable each time the term changes
      mergeMap((term: string) => this.partService.searchParts(term))
    );
  
    this.customers$ = search$.pipe(
      // switch to new search observable each time the term changes
      mergeMap((term: string) => this.customerService.searchCustomers(term))
    );
  
    this.machines$ = search$.pipe(
      // switch to new search observable each time the term changes
      mergeMap((term: string) => this.machineService.searchMachines(term))
    );
  }
}