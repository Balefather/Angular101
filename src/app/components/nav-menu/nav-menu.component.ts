import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public roles$: Observable<string[]>;


  constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.roles$ = this.authService.roles$;
    this.roles$.subscribe(roles => {
      this.changeDetectorRef.detectChanges();
     });
    this.authService.extractRolesFromToken(localStorage.getItem("jwtToken")||"no token");
  }
}
