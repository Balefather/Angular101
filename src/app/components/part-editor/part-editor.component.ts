import { Component, Input, OnInit } from '@angular/core';
import { Part } from 'src/app/model/part';
import { Customer } from 'src/app/model/customer';
import { Machine } from 'src/app/model/machine';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-part-editor',
  templateUrl: './part-editor.component.html',
  styleUrls: ['./part-editor.component.css']
})
export class PartEditorComponent {
  @Input() part: Part;
  adjustment: number = 0;
  totalChanged: number = 0;
  message: string = '';
  selectedFile: File;
  thumbnailSrc: string;

  constructor(private http: HttpClient){}

  calculateTotal(): void{
    this.totalChanged = this.part.amountPartMachine + this.adjustment;
  }

  ngOnInit(): void{
    this.calculateTotal();
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



}