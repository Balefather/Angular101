import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './../../message.service';
import { Observable, of } from 'rxjs';
import { Customer } from '../../../model/customer';
import { Machine } from '../../../model/machine';
import { Part } from '../../../model/part';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = 'https://www.shiggy.dk/api/CustomersMachinesParts/Customers';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.customersUrl, customer, this.httpOptions).pipe(
      tap((newCustomer: Customer) => this.log(`added customer w/ id=${newCustomer.customerID}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    )
  }

  /** GET customers from the database through API */
  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.customersUrl)
    .pipe(
      tap(_ => this.log(`fetched customers, length = ${_.length}`)),
      catchError(this.handleError<Customer[]>('getCustomers', [])))
  }
  
  /** GET customer by id. Will 404 if id not found */
  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  /** PUT: update the customer on the server */
  updateCustomer(customer: Customer): Observable<any> {
    return this.http.put(`${this.customersUrl}/${customer.customerID}`, customer, this.httpOptions).pipe(
      tap(_ => this.log(`updated customer id=${customer.customerID}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  /** DELETE: delete the customer from the server */
  deleteCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
  
    return this.http.delete<Customer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  /* GET heroes whose name contains search term */
  searchCustomers(term: string): Observable<Customer[]> {
    if (!term.trim()) {
      // if not search term, return empty customer array.
      return of([]);
    }
    return this.http.get<Customer[]>(`${this.customersUrl}/Search/${term}`).pipe(
      tap(x => x.length ?
         this.log(`found customer matching "${term}"`) :
         this.log(`no customers matching "${term}"`)),
      catchError(this.handleError<Customer[]>('searchCustomers', []))
    );
  }

  /** Log a CustomerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CustomerService: ${message}`);
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
