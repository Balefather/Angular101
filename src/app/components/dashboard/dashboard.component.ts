import { Component, OnInit } from '@angular/core';
import { Part } from '../../model/part';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/models/customer/customer.service';
import { PartService } from '../../services/models/part/part.service';
import { MessageService } from '../../services/message.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customers: Customer[] | null = null;
  isLoggedIn$: Observable<boolean>;
  
  constructor(private partService: PartService, private messageService: MessageService, private authService: AuthService, private cService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
        this.isLoggedIn$.subscribe(loggedIn => {
          //do stuff dependant on login status
        });
  }

  onHover(partName: string): void {
    this.messageService.add(`${partName}: "Don't touch me!"`);
  }

  getCustomers(): void {
    this.cService.getCustomers()
      .subscribe(customers => this.customers = customers.slice(1, 5));
  }
}
