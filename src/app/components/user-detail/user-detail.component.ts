import { Component, Input } from '@angular/core';
import { User, Role } from '../../model/user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input() user: User | null;
  roles: string[] = [];
  rolesNotInUser: string[] = [];
  allRoles: Role[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userID = Number(params.get('userID'));
      this.getUser()
    });

  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.user) {
      this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
    }
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        if (this.user) {
          this.getRolesByID(this.user.userID)

        }
      });
  }

  getRolesByID(userID: number): void {
    this.userService.getRolesByID(userID)
      .subscribe(roles => {
        this.roles = roles;
        this.getAllRoles();
      });
  }

  getAllRoles(): void{
    this.userService.getRoles().subscribe(allRoles => {
      this.allRoles = allRoles;
      this.rolesNotInUser = [];
      this.allRoles.forEach(r => {
        if (!this.roles.includes(r.roleName)) {
          this.rolesNotInUser.push(r.roleName)
        }
      });
    })
  }

  addRoleToUser(role: string): void{
    if (this.user) {
      this.userService.addRoleToUser(role, this.user.userID, () => {
        if (this.user) {
          this.getRolesByID(this.user.userID);
        }
      });
    }
  }

  removeRoleFromUser(role: string): void{
    if (this.user) {
      this.userService.deleteRoleFromUser(role, this.user.userID, () => {
        if (this.user) {
          this.getRolesByID(this.user?.userID);       
        }
      });
    }
  }
}
