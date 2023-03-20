import { Component, OnInit } from '@angular/core';
import { Part } from '../../model/part';
import { PartService } from '../../services/part.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  parts: Part[] = [];

  constructor(private partService: PartService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getParts();
  }

  onHover(partName: string): void {
    this.messageService.add(`${partName}: "Don't touch me!"`);
  }

  getParts(): void {
    this.partService.getParts()
      .subscribe(parts => this.parts = parts.slice(1, 5));
  }
}
