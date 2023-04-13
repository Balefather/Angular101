import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
username: string | null;
password: string | null;
isLoggedIn$: Observable<boolean>;
showPopup = false;
name: string | null = null || "N/A";
@ViewChild('usernameInput', { static: true }) usernameInput: ElementRef;


  constructor(private authService: AuthService, private messageService: MessageService, private router: Router){}


  togglePopup() {
    if (this.showPopup) {
      this.messageService.add("Closed login panel")
      this.showPopup = false;
    } else {
      this.messageService.add("Opened login panel")
      this.showPopup = true;
      this.usernameInput.nativeElement.focus();
    }
  }
  
  
  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        () => {
          console.log('Logged in successfully');
          this.name = localStorage.getItem('username');
        },
        error => {console.error('Error logging in:', error), this.messageService.add("Error logging in")}
        
      );
    }
    this.showPopup = false;
  }

  logout() {
    this.authService.logout();
/*     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    }); */
    this.name = "N/A";
    this.showPopup = false;
  }

  ngOnInit(): void{
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedIn$.subscribe(loggedIn => { });
    if (localStorage.getItem('username')) {
      this.name = localStorage.getItem('username');
    } else {
      this.name = "N/A";
    }

  }
}
