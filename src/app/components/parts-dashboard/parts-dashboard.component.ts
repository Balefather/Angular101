import { Component, OnInit, Input } from '@angular/core';
import { Part } from '../../model/part';
import { PartService } from '../../services/models/part/part.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-parts-dashboard',
  templateUrl: './parts-dashboard.component.html',
  styleUrls: ['./parts-dashboard.component.css']
})
export class PartsDashboardComponent implements OnInit {
  @Input() parts?: Part[] | null = [];

  constructor(private partService: PartService, private messageService: MessageService) { }

  ngOnInit(): void {
/*     this.getParts(); */
this.messageService.add(`Loaded parts-dashboard with ${this.parts?.length} parts`)
  }

  onHover(partName: string): void {
/*     this.messageService.add(`${partName}: "Don't touch me!"`); */
  }

/*   getParts(): void {
    this.partService.getParts()
      .subscribe(parts => this.parts = parts.slice(1, 5));
  } */
}
