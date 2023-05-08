import { Component, OnInit } from '@angular/core';
import { Service } from '../../model/service'
import { ServiceService } from '../../services/models/service/service.service';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getServices();
  }

/*   add(serviceName: string, numberInStock: number, servicePrice: number): void {
    serviceName = serviceName.trim();
    if (!serviceName) { return; }
    this.serviceService.addService({ serviceName, numberInStock, servicePrice } as Service)
      .subscribe(service => {
        this.services.push(service);
      });
  } */

  getServices(): void {
    this.serviceService.getServices()
      .subscribe(services => this.services = services);
  }

/*   delete(service: Service): void {
    this.services = this.services.filter(p => p !== service);
    this.serviceService.deleteService(service.serviceID).subscribe();
  } */
}
