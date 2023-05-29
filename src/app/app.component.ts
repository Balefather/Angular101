import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  title = 'Nolek Tekniker Assistent';
  loggingEnabled: boolean;

  constructor(private authService: AuthService, private configService: ConfigService) {}

  ngOnInit(): void{
    this.getLoggingStatus();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedIn$.subscribe(loggedIn => { });
 
  }

  getLoggingStatus(): void {
    this.configService.getLoggingEnabledStatus().subscribe(loggingEnabled => {
      this.loggingEnabled = loggingEnabled;
    });
  }
}


