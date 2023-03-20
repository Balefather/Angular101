import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Part } from '../model/part';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private partsUrl = 'https://www.shiggy.dk/api/Parts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addPart(part: Part): Observable<Part>{
    return this.http.post<Part>(this.partsUrl, part, this.httpOptions).pipe(
      tap((newPart: Part) => this.log(`added part w/ id=${newPart.partID}`)),
      catchError(this.handleError<Part>('addPart'))
    )
  }

  /** GET parts from the database through API */
  getParts(): Observable<Part[]>{
    return this.http.get<Part[]>(this.partsUrl)
    .pipe(
      tap(_ => this.log('fetched parts')),
      catchError(this.handleError<Part[]>('getParts', [])))
  }
  
  /** GET part by id. Will 404 if id not found */
  getPart(id: number): Observable<Part> {
    const url = `${this.partsUrl}/${id}`;
    return this.http.get<Part>(url).pipe(
      tap(_ => this.log(`fetched part id=${id}`)),
      catchError(this.handleError<Part>(`getPart id=${id}`))
    );
  }

  /** PUT: update the part on the server */
  updatePart(part: Part): Observable<any> {
    return this.http.put(`${this.partsUrl}/${part.partID}`, part, this.httpOptions).pipe(
      tap(_ => this.log(`updated part id=${part.partID}`)),
      catchError(this.handleError<any>('updatePart'))
    );
  }

  /** DELETE: delete the part from the server */
  deletePart(id: number): Observable<Part> {
    const url = `${this.partsUrl}/${id}`;
  
    return this.http.delete<Part>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted part id=${id}`)),
      catchError(this.handleError<Part>('deletePart'))
    );
  }

  /* GET heroes whose name contains search term */
  searchParts(term: string): Observable<Part[]> {
    if (!term.trim()) {
      // if not search term, return empty part array.
      return of([]);
    }
    return this.http.get<Part[]>(`${this.partsUrl}/Search/${term}`).pipe(
      tap(x => x.length ?
         this.log(`found part matching "${term}"`) :
         this.log(`no parts matching "${term}"`)),
      catchError(this.handleError<Part[]>('searchParts', []))
    );
  }

  /** Log a PartService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PartService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
