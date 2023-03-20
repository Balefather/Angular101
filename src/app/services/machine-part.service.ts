import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { MachinePart } from '../model/machinePart';

@Injectable({
  providedIn: 'root'
})
export class MachinePartService {
  private machinePartsUrl = 'https://www.shiggy.dk/api/MachineParts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addMachinePart(machinePart: MachinePart): Observable<MachinePart>{
    return this.http.post<MachinePart>(this.machinePartsUrl, machinePart, this.httpOptions).pipe(
      tap((newMachinePart: MachinePart) => this.log(`added machinePart w/ id=${newMachinePart.machineID}`)),
      catchError(this.handleError<MachinePart>('addMachinePart'))
    )
  }

  /** GET machineParts from the database through API */
  getMachineParts(): Observable<MachinePart[]>{
    return this.http.get<MachinePart[]>(this.machinePartsUrl)
    .pipe(
      tap(_ => this.log('fetched machineParts')),
      catchError(this.handleError<MachinePart[]>('getMachineParts', [])))
  }
  
  /** GET machinePart by id. Will 404 if id not found */
  getMachinePart(id: number): Observable<MachinePart> {
    const url = `${this.machinePartsUrl}/${id}`;
    return this.http.get<MachinePart>(url).pipe(
      tap(_ => this.log(`fetched machinePart id=${id}`)),
      catchError(this.handleError<MachinePart>(`getMachinePart id=${id}`))
    );
  }

  /** PUT: update the machinePart on the server */
  updateMachinePart(machinePart: MachinePart): Observable<any> {
    return this.http.put(`${this.machinePartsUrl}/${machinePart.machineID}`, machinePart, this.httpOptions).pipe(
      tap(_ => this.log(`updated machinePart id=${machinePart.machineID}`)),
      catchError(this.handleError<any>('updateMachinePart'))
    );
  }

  /** DELETE: delete the machinePart from the server */
  deleteMachinePart(id: number): Observable<MachinePart> {
    const url = `${this.machinePartsUrl}/${id}`;
  
    return this.http.delete<MachinePart>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted machinePart id=${id}`)),
      catchError(this.handleError<MachinePart>('deleteMachinePart'))
    );
  }

  /* GET heroes whose name contains search term */
  searchMachineParts(term: string): Observable<MachinePart[]> {
    if (!term.trim()) {
      // if not search term, return empty machinePart array.
      return of([]);
    }
    return this.http.get<MachinePart[]>(`${this.machinePartsUrl}/Search/${term}`).pipe(
      tap(x => x.length ?
         this.log(`found machinePart matching "${term}"`) :
         this.log(`no machineParts matching "${term}"`)),
      catchError(this.handleError<MachinePart[]>('searchMachineParts', []))
    );
  }

  /** Log a MachinePartService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MachinePartService: ${message}`);
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
