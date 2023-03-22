import { Component, Input } from '@angular/core';
import { Machine } from '../../model/machine';
import { Part } from '../../model/part';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { MachineService } from '../../services/machine.service';
import { PartService } from '../../services/part.service';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.css']
})
export class MachineDetailComponent {
  @Input() machine: Machine | null;
  partsToAdd: Part[] = [];
  updateParts: boolean;

  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService,
    private partService: PartService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const machineID = Number(params.get('machineID'));
      this.getMachine();
    });
  }

  goBack(): void {
    this.location.back();
  }

  updateMode(){
    if (this.updateParts) {
      this.updateParts = false;
    } else {
      this.updateParts = true;
    }
  }

  loadPartsNotInMachine(): void {
    const parts = this.partService.getParts();
    const machine = this.machine;
    if (machine != null && machine.parts != null) {
      parts.forEach(element => {
        element.forEach(part => {
          if (!machine.parts.some(mpart => mpart.partID === part.partID)) {
            this.partsToAdd.push(part);
          }
        });
      });
    }
  }
  
  
  addPartToMachine(part: Part): void {
    this.machine?.parts.push(part);
    const index = this.partsToAdd.findIndex(p => p.partID === part.partID);
    // or const index = this.partsToAdd.indexOf(part);
    if (index !== -1) {
      this.partsToAdd.splice(index, 1);
    }
  }

  removePartFromMachine(part: Part): void {
    this.partsToAdd.push(part);
    if (this.machine != null && this.machine.parts != null) {
      const index = this.machine.parts.findIndex(p => p.partID === part.partID);
      // or const index = this.partsToAdd.indexOf(part);
      if (index !== -1) {
        this.machine?.parts.splice(index, 1);
      }
    }
  }

  save(): void {
    if (this.machine) {
      this.machineService.updateMachine(this.machine)
        .subscribe(() => this.goBack());
    }
  }

  getMachine(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.machineService.getMachine(id).subscribe(machine => {
      this.machine = machine;
      this.loadPartsNotInMachine();
    });
  }

}
