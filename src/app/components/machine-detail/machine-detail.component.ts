import { Component, Input } from '@angular/core';
import { Machine } from '../../model/machine';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { MachineService } from '../../services/machine.service';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.css']
})
export class MachineDetailComponent {
  @Input() machine: Machine | null;

  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService,
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

  save(): void {
    if (this.machine) {
      this.machineService.updateMachine(this.machine)
        .subscribe(() => this.goBack());
    }
  }

  getMachine(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.machineService.getMachine(id)
      .subscribe(machine => this.machine = machine);
  }

}
