import { Component, Input } from '@angular/core';
import { Service } from '../../model/service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ServiceService } from '../../services/models/service/service.service';
import { Image } from 'src/app/model/image';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent {
  @Input() service: Service;
  images: Image[];

  selectedFile: File;
  thumbnailSrc: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private location: Location,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const serviceID = Number(params.get('serviceID'));
      this.getService();
      this.loadImages();
    });
  }

  onFileSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      this.selectedFile = inputElement.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.thumbnailSrc = reader.result as string;
      }
      this.uploadFile(this.service.serviceID);
    }
  }

  uploadFileService(serviceID: number) {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('serviceID', serviceID.toString()); // Append serviceID to the formData
  
    this.http.post('https://localhost:7047/api/Upload/Service', formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  uploadFile(serviceID: number) {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
  
    this.http.post(`https://www.shiggy.dk/api/Upload/Service?serviceID=${serviceID}`, formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
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

  loadImages(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceService.getImages(id)
      .subscribe(images => this.images = images);
      this.messageService.add(`service has ${this.images ? this.images.length : 0} images`)
  }

  getService(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceService.getService(id)
      .subscribe(service => this.service = service);
      this.messageService.add(`service has ${this.service?.images ? this.service?.images.length : 0} images`)
  }
}
