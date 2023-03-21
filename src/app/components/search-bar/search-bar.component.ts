import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Part } from '../../model/part';
import { PartService } from '../../services/part.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: [ './search-bar.component.css' ]
})
export class SearchBarComponent implements OnInit, OnDestroy {
  parts$!: Observable<Part[]>;
  private searchTerms = new Subject<string>();
  searchValue: string = '';
  constructor(private partService: PartService, private elementRef: ElementRef) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
    this.parts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.partService.searchParts(term)),
    );
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.searchValue = '';
    }
    this.search(this.searchValue)
  }
}