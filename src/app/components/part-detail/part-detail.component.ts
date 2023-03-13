import { Component, Input } from '@angular/core';
import { Part } from '../../model/part';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PartService } from '../../services/part.service';
@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.css']
})
export class PartDetailComponent {
  @Input() part?: Part | null;

  constructor(
    private route: ActivatedRoute,
    private partService: PartService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPart();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.part) {
      this.partService.updatePart(this.part)
        .subscribe(() => this.goBack());
    }
  }

  
  

  getPart(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.partService.getPart(id)
      .subscribe(part => this.part = part);
  }
}
