import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { Observable, map } from 'rxjs';
import { MessageService } from './../message.service';
import jwt_decode from 'jwt-decode';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://www.shiggy.dk/api/users/login';
  private readonly jwtTokenKey = 'jwtToken';
  private token: string;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private RoleSubject = new BehaviorSubject<string[]>([]);
  
  constructor(private http: HttpClient, private messageService: MessageService) {
    this.token = localStorage.getItem('jwtToken') || "No token";
    if (localStorage.getItem(this.jwtTokenKey)) {
      this.isLoggedInSubject.next(true);
      this.extractRolesFromToken(this.token);
      this.extractUsernameFromToken(this.token);
    }
   }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get isLoggedIn$() {
    return this.isLoggedInSubject.asObservable();
  }

  get roles$() {
    return this.RoleSubject.asObservable();
  }

  login(username: string, password: string) {
    localStorage.setItem("login", "true");
    localStorage.setItem("roles", "true");
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        this.token = response.token;
        localStorage.setItem(this.jwtTokenKey, this.token);
        this.extractRolesFromToken(this.token);
        this.extractUsernameFromToken(this.token);
        this.setRoleSubject();
        this.isLoggedInSubject.next(true);
      })
    );
  }

  setRoleSubject(){
    this.messageService.add(`Set roles to: ${localStorage.getItem('roles')||""}`)
    this.RoleSubject.next((localStorage.getItem('roles')||"").split(","));
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  extractRolesFromToken(token: string): void {
    const decodedToken: { [key: string]: any } = jwt_decode(token);
    const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const role = decodedToken[roleClaim];
    localStorage.setItem('roles', role);
    this.setRoleSubject();
  }

  extractUsernameFromToken(token: string): void {
    const decodedToken: { [key: string]: any } = jwt_decode(token);
    const user = decodedToken['sub'];
    localStorage.setItem('username', user);
  }
  

  getJwtToken(): string {
    const token = localStorage.getItem(this.jwtTokenKey);
    if (localStorage.getItem("login")) {
      localStorage.removeItem("login");
      this.isLoggedInSubject.next(false);
      return ''
    }
    if (token === null) {
        throw new Error('JWT token is not available.');
        // Alternatively, you can return an empty string:
        return '';
    }
    return token;
}

  logout(): void {
    localStorage.removeItem(this.jwtTokenKey);
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
    this.isLoggedInSubject.next(false);
    this.RoleSubject.next([]);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


