import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './../../message.service';
import { Observable, of } from 'rxjs';
import { ServiceInterface, Service } from '../../../model/service';
import { ServiceDto } from 'src/app/model/serviceDto';
import { Image } from 'src/app/model/image';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private servicesUrl = 'https://localhost:7047/api/Services';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addService(service: ServiceDto): Observable<ServiceDto>{
    return this.http.post<ServiceDto>(`${this.servicesUrl}/CreateNewService`, service, this.httpOptions).pipe(
      tap((newService: ServiceDto) => this.log(`added service w/ id=${newService.serviceID}`)),
      catchError(this.handleError<ServiceDto>('addService'))
    )
  }

  /** GET services from the database through API */
  getServices(): Observable<Service[]>{
    return this.http.get<Service[]>(this.servicesUrl)
    .pipe(
      tap(_ => this.log('fetched services')),
      catchError(this.handleError<Service[]>('getServices', [])))
  }

  getImages(id: number): Observable<Image[]>{
    const url = `${this.servicesUrl}/ImagesByServiceID/${id}`;
    return this.http.get<Image[]>(url).pipe(
      tap(_ => this.log(`fetched service id=${id}`)),
      catchError(this.handleError<Image[]>(`getService id=${id}`))
    );
  }
  
  /** GET service by id. Will 404 if id not found */
  getService(id: number): Observable<Service> {
    const url = `${this.servicesUrl}/${id}`;
    return this.http.get<ServiceInterface>(url).pipe(
      tap(_ => this.log(`fetched service id=${id}`)),
      catchError(this.handleError<Service>(`getService id=${id}`))
    );
  }

    /** GET service by id. Will 404 if id not found */
/*     getService(id: number): Observable<Service> {
      const url = `${this.servicesUrl}/${id}`;
      return this.http.get<Service>(url).pipe(
        map(serviceData => {
          // Create new Image objects from the JSON data
          const images = serviceData.images 
          ? serviceData.images.map(imageData => new Image(imageData.imageID, imageData.imagePath))
          : [];        // Create a new Service object with the updated images property
          const service = new Service(
            serviceData.serviceID,
            serviceData.serviceDate,
            serviceData.customerName,
            serviceData.machineName,
            serviceData.machineSerialNumber,
            serviceData.serviceParts,
            images,
            serviceData.transportTimeUsed,
            serviceData.transportKmUsed,
            serviceData.workTimeUsed,
            serviceData.note,
            serviceData.machineStatus
          );
          return service;
        }),
        tap(_ => this.log(`fetched service id=${id}`)),
        catchError(this.handleError<Service>(`getService id=${id}`))
      );
    } */

  /** PUT: update the service on the server */
  updateService(service: Service): Observable<any> {
    return this.http.put(`${this.servicesUrl}/${service.serviceID}`, service, this.httpOptions).pipe(
      tap(_ => this.log(`updated service id=${service.serviceID}`)),
      catchError(this.handleError<any>('updateService'))
    );
  }

  /** DELETE: delete the service from the server */
  deleteService(id: number): Observable<Service> {
    const url = `${this.servicesUrl}/${id}`;
  
    return this.http.delete<Service>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted service id=${id}`)),
      catchError(this.handleError<Service>('deleteService'))
    );
  }

  /* GET heroes whose name contains search term */
  searchServices(term: string): Observable<Service[]> {
    if (!term.trim()) {
      // if not search term, return empty service array.
      return of([]);
    }
    return this.http.get<Service[]>(`${this.servicesUrl}/Search/${term}`).pipe(
      tap(x => x.length ?
         this.log(`found service matching "${term}"`) :
         this.log(`no services matching "${term}"`)),
      catchError(this.handleError<Service[]>('searchServices', []))
    );
  }

  /** Log a ServiceService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ServiceService: ${message}`);
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
