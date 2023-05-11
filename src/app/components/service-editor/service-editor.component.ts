import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { Machine } from 'src/app/model/machine';
import { Service } from 'src/app/model/service';
import { ServiceService } from 'src/app/services/models/service/service.service';
import { ServiceDto, Part } from 'src/app/model/serviceDto';
import { CustomerMachine } from 'src/app/model/customerMachine';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-editor',
  templateUrl: './service-editor.component.html',
  styleUrls: ['./service-editor.component.css']
})
export class ServiceEditorComponent {
  @Input() machine: CustomerMachine;
  @Input() customer: Customer;

  service: ServiceDto = new ServiceDto(0, 0, 0, "", [], 0, 0, 0, "", "");


  message: string = '';
  selectedFile: File;
  thumbnailSrc: string;

  constructor(private router: Router, private http: HttpClient, private serviceService: ServiceService){}


  ngOnInit(): void{
    this.service.customerID = this.customer.customerID;
    this.service.machineID = this.machine.machineID;
    this.service.machineSerialNumber = this.machine.machineSerialNumber;
    this.machine.parts.forEach(element => {
      this.service.serviceParts.push(new Part(element.partID, element.amountPartMachine))
    });

/*     this.calculateTotal(); */
  }

  add(service: ServiceDto): void{
    this.serviceService.addService(service).subscribe(newService => {
      // Assuming you have a route named 'service-details' with a parameter 'id'
      this.router.navigate(['service-detail', newService.serviceID]);
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
      this.uploadFile();
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('https://www.shiggy.dk/api/Upload', formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  uploadFileService(serviceID: number) {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('serviceID', serviceID.toString()); // Append serviceID to the formData
  
    this.http.post('https://www.shiggy.dk/api/Upload/Service', formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }



}