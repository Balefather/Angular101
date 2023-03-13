import { Component, OnInit } from '@angular/core';
import { Part } from '../../model/part'
import { PartService } from '../../services/part.service';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {
  parts: Part[] = [];

  constructor(private partService: PartService) { }

  ngOnInit(): void {
    this.getParts();
  }

  add(partName: string, numberInStock: number, partPrice: number, partID: number): void {
    partName = partName.trim();
    if (!partName) { return; }
    this.partService.addPart({ partID, partName, numberInStock, partPrice } as Part)
      .subscribe(hero => {
        this.parts.push(hero);
      });
  }

  getParts(): void {
    this.partService.getParts()
      .subscribe(parts => this.parts = parts);
  }

  delete(part: Part): void {
    this.parts = this.parts.filter(p => p !== part);
    this.partService.deletePart(part.partID).subscribe();
  }
}
