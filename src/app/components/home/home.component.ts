import { Component, OnInit } from '@angular/core';
import { IResponse } from 'src/app/models/iresponse';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedFile!: File;

  constructor(private imageService: ImageService) {}
  ngOnInit(): void {}

  SelectImage(event: any) {
    this.selectedFile = event.target.files[0];
  }

  Add() {
    let formData = new FormData();
    formData.append('file', this.selectedFile);

    this.imageService.uploadImage(formData).subscribe({
      next: (v) => {
        let response = v as IResponse;
        console.log(response);
      },
      error: (e) => console.log(e),
      complete: () => console.log('complete'),
    });
  }
}
