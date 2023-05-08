import { Component, Input } from '@angular/core';
import { Service } from '../../model/service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

import { ServiceService } from '../../services/models/service/service.service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent {
  @Input() service?: Service | null;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private location: Location,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const serviceID = Number(params.get('serviceID'));
      this.getService();
    });

  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.service) {
      this.serviceService.updateService(this.service)
        .subscribe(() => this.goBack());
    }
  }

  getService(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceService.getService(id)
      .subscribe(service => this.service = service);
      this.messageService.add(`service has ${this.service?.images ? this.service?.images.length : 0} images`)
  }
}
