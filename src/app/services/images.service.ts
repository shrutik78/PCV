import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
baseUrl='https://pcv.pythonanywhere.com/api/';


  constructor(private http:HttpClient) { }

  getFRWheelImages(){
    return this.http.get(this.baseUrl + 'wheelimages/')
  }

  getFRRoofImages(){
    return this.http.get(this.baseUrl + 'roofimages/')
  }

  getFRMirrorImages(){
    return this.http.get(this.baseUrl + 'outsidemirrorimages/')
  }

  getFLCapImages(){
    return this.http.get(this.baseUrl + 'hubcapimages/')
  }

  getFLDoorImages(){
    return this.http.get(this.baseUrl + 'doorimages/')
  }

  getFLHandleImages(){
    return this.http.get(this.baseUrl  + 'doorhandleimages/')
  }

  getFLWindowImages(){
    return this.http.get(this.baseUrl  + 'windowimages/')
  }

  getRRLogoImages(){
    return this.http.get(this.baseUrl + 'logoimages/')
  }

  getRRHoodImages(){
    return this.http.get(this.baseUrl + 'hoodimages/')
  }

  getRRWiperImages(){
    return this.http.get(this.baseUrl + 'wiperimages/')
  
  }

  getRLTrunkImages(){
    return this.http.get(this.baseUrl + 'trunkimages/')
  }

  getRLLightImages(){
    return this.http.get(this.baseUrl  + 'taillightimages/')
  }
}
