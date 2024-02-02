import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
baseUrl='http://192.168.29.78:8000/api/';

  constructor(private http:HttpClient) { }

  getWheelImages(){
    return this.http.get(this.baseUrl + 'wheelimages/')
  }

  getRoofImages(){
    return this.http.get(this.baseUrl + 'roofimages/')
  }

  getLogoImages(){
    return this.http.get(this.baseUrl + 'logoimages/')
  }
}
