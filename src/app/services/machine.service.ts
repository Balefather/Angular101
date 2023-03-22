import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Machine } from '../model/machine';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private machineUrl = 'https://www.shiggy.dk/api/MachineParts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addMachine(machine: Machine): Observable<Machine>{
    return this.http.post<Machine>(this.machineUrl, machine, this.httpOptions).pipe(
      tap((newMachine: Machine) => this.log(`added machine w/ id=${newMachine.machineID}`)),
      catchError(this.handleError<Machine>('addMachine'))
    )
  }

  /** GET machineParts from the database through API */
  getMachines(): Observable<Machine[]>{
    return this.http.get<Machine[]>(this.machineUrl)
    .pipe(
      tap(_ => this.log('fetched machine')),
      catchError(this.handleError<Machine[]>('getMachines', [])))
  }
  
  /** GET machinePart by id. Will 404 if id not found */
  getMachine(id: number): Observable<Machine> {
    const url = `${this.machineUrl}/${id}`;
    return this.http.get<Machine>(url).pipe(
      tap(_ => this.log(`fetched machine id=${id}`)),
      catchError(this.handleError<Machine>(`getMachine id=${id}`))
    );
  }

  /** PUT: update the machinePart on the server */
  updateMachine(machine: Machine): Observable<any> {
    return this.http.put(`${this.machineUrl}/${machine.machineID}`, machine, this.httpOptions).pipe(
      tap(_ => this.log(`updated machine id=${machine.machineID}`)),
      catchError(this.handleError<any>('updateMachine'))
    );
  }

  /** DELETE: delete the machine from the server */
  deleteMachine(id: number): Observable<Machine> {
    const url = `${this.machineUrl}/${id}`;
  
    return this.http.delete<Machine>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted machine id=${id}`)),
      catchError(this.handleError<Machine>('deleteMachine'))
    );
  }

  /* GET machines whose name contains search term */
  searchMachines(term: string): Observable<Machine[]> {
    if (!term.trim()) {
      // if not search term, return empty machinePart array.
      return of([]);
    }
    return this.http.get<Machine[]>(`${this.machineUrl}/Search/${term}`).pipe(
      tap(x => x.length ?
         this.log(`found machine matching "${term}"`) :
         this.log(`no machine matching "${term}"`)),
      catchError(this.handleError<Machine[]>('searchMachine', []))
    );
  }

  /** Log a MachineService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MachineService: ${message}`);
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
