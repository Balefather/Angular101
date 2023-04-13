import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user'
import { UserService } from '../../services/models/user/user.service';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  add(username: string, password: string, firstName: string, lastName: string): void {
    username = username.trim();
    if (!username) { return; }
    this.userService.addUser({ username, password, firstName, lastName } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  delete(user: User): void {
    this.users = this.users.filter(p => p !== user);
    this.userService.deleteUser(user.userID).subscribe();
  }
}
