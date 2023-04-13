import { Component, OnInit } from '@angular/core';
import { Part } from '../../model/part';
import { PartService } from '../../services/part.service';
import { MessageService } from '../../services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  parts: Part[] | null = null;
  isLoggedIn$: Observable<boolean>;
  
  constructor(private partService: PartService, private messageService: MessageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getParts();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
        this.isLoggedIn$.subscribe(loggedIn => {
          //do stuff dependant on login status
        });
  }

  onHover(partName: string): void {
    this.messageService.add(`${partName}: "Don't touch me!"`);
  }

  getParts(): void {
    this.partService.getParts()
      .subscribe(parts => this.parts = parts.slice(1, 5));
  }
}
