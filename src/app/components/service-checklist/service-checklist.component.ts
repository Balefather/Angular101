import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Part } from 'src/app/model/part';
import { PartService } from 'src/app/services/part.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-service-checklist',
  templateUrl: './service-checklist.component.html',
  styleUrls: ['./service-checklist.component.css']
})
export class ServiceChecklistComponent implements OnInit{
  parts: Part[] = [];
  selectedParts: Part[] = [];
  noToChange: number = 2;
  adjustment: number = 0;
  totalChanged: number = 0;
  searchResultParts$!: Observable<Part[]>;
  private searchTerms = new Subject<string>();
  searchValue:string = '';

  formData = {
    name: '',
    email: '',
    message: ''
  };
  constructor(private partService: PartService, private messageService: MessageService){}

  calculateTotal(): void{
    this.totalChanged = this.noToChange + this.adjustment;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  submitForm(form: NgForm){
    console.log(this.formData);
    form.reset();
  }

  ngOnInit(): void{
    this.GetParts();
    this.initializeSearchResult();
    this.calculateTotal();

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
