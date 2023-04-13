import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './../../message.service';
import { Observable, of } from 'rxjs';
import { User, Role } from '../../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'https://www.shiggy.dk/api/Users';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addUser(user: User): Observable<User>{
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ id=${newUser.userID}`)),
      catchError(this.handleError<User>('addUser'))
    )
  }

  /** GET users from the database through API */
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', [])))
  }

  getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.usersUrl}/Roles`)
    .pipe(
      tap(_ => this.log('fetched roles')),
      catchError(this.handleError<Role[]>('getRoles', [])))
  }
  
  /** GET roles by userID from the database through API */
  getRolesByID(userID: number): Observable<string[]>{
    return this.http.get<string[]>(`${this.usersUrl}/GetRolesByID?userID=${userID}`)
    .pipe(
      tap(_ => this.log(`fetched roles owned by user ID: ${userID}`)),
      catchError(this.handleError<string[]>('getRolesByID', [])))
    }


  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.usersUrl}/${user.userID}`, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.userID}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

    /** DELETE: delete the user from the server */
/*     deleteRoleFromUser(rolename: string, userId: number): Observable<User> {
      const url = `${this.usersUrl}/RemoveRoleFromUser?rolename=${rolename}&userid=${userId}`;
      return this.http.delete<User>(url, this.httpOptions).pipe(
        tap(_ => this.log(`removed role ${rolename} from user id=${userId}. This may not update the roles observable.`)),
        catchError(this.handleError<User>('deleteRoleFromUser'))
      );
    } */

    
    deleteRoleFromUser(rolename: string, userid: number, callback: () => void) {
      const url = `https://www.shiggy.dk/api/Users/RemoveRoleFromUser?rolename=${rolename}&userid=${userid}`;
      return this.http.delete(url).subscribe(
        (response) => {
          console.log(response); // log the response from the server
          this.messageService.add(`Removed role: ${rolename} from UserID ${userid}`)
          callback();
        },
        (error) => {
          console.error(error); // log any errors that occur
        }
      );
    }

/*     addRoleToUser(rolename: string, userid: number) {
      const url = `https://www.shiggy.dk/api/Users/AddRoleToUser?rolename=${rolename}&userid=${userid}`;
      return this.http.post(url, rolename).subscribe(
        (response) => {
          console.log(response); // log the response from the server
        },
        (error) => {
          console.error(error); // log any errors that occur
        }
      );
    } */

    addRoleToUser(rolename: string, userid: number, callback: () => void) {
      const url = `https://www.shiggy.dk/api/Users/AddRoleToUser?rolename=${rolename}&userid=${userid}`;
      return this.http.post(url, rolename).subscribe(
        (response) => {
          console.log(response); // log the response from the server
          this.messageService.add(`added role: ${rolename} to UserID ${userid}`)
          callback();
        },
        (error) => {
          console.error(error); // log any errors that occur
        }
      )
    }
    

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
  
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /* GET heroes whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/Search/${term}`).pipe(
      tap(x => x.length ?
         this.log(`found user matching "${term}"`) :
         this.log(`no users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
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
