import { Component, OnInit } from '@angular/core';
import { Machine } from '../../model/machine'
import { MachineService } from '../../services/models/machine/machine.service';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  machines: Machine[] = [];

  constructor(private machineService: MachineService) { }

  ngOnInit(): void {
    this.getMachines();
  }

  add(machineName: string, partsMustChange: string, serviceInterval: number): void {
    machineName = machineName.trim();
    if (!machineName) { return; }
    this.machineService.addMachine({ machineName, partsMustChange, serviceInterval } as Machine)
      .subscribe(machine => {
        this.machines.push(machine);
      });
  }

  getMachines(): void {
    this.machineService.getMachines()
      .subscribe(machines => this.machines = machines);
  }

  delete(machine: Machine): void {
    this.machines = this.machines.filter(p => p !== machine);
    this.machineService.deleteMachine(machine.machineID).subscribe();
  }
}
