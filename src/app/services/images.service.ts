import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
// baseUrl='https://pcv.pythonanywhere.com/api/';
// url='http://192.168.29.78:8000/api/multiple-images/'
// apiUrl='http://192.168.29.78:8000/api/'

baseUrl=environment.baseUrl 

  constructor(private http:HttpClient) { }

  getData(vinNumber: string): Observable<any> {
    return this.http.get<any>(`https://pcv.pythonanywhere.com/api/scan/${vinNumber}/`);
  }

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


  // getFRWheelImages(){
  
  
  //   return this.http.get(this.apiUrl + 'wheelimages/')

  // }

  // getFRRoofImages(){

  //   return this.http.get(this.apiUrl + 'roofimages/')

  // }

  // getFRMirrorImages(){
  //     return this.http.get(this.apiUrl + 'outsidemirrorimages/')

  // }

  // getFLCapImages(){

  //   return this.http.get(this.apiUrl + 'hubcapimages/')

  // }

  // getFLDoorImages(){

  //   return this.http.get(this.apiUrl + 'doorimages/')

  // }

  // getFLHandleImages(){
  
  //   return this.http.get(this.apiUrl  + 'doorhandleimages/')

  // }

  // getFLWindowImages(){

  //   return this.http.get(this.apiUrl  + 'windowimages/')

  // }

  // getRRLogoImages(){
 
  //   return this.http.get(this.apiUrl + 'logoimages/')

  // }

  // getRRHoodImages(){
 
  //   return this.http.get(this.apiUrl + 'hoodimages/')

  // }

  // getRRWiperImages(){

  //   return this.http.get(this.apiUrl + 'wiperimages/')

  
  // }

  // getRLTrunkImages(){
   
  //   return this.http.get(this.apiUrl + 'trunkimages/')

  // }

  // getRLLightImages(){
   
  //   return this.http.get(this.apiUrl  + 'taillightimages/')

  // }

  getAllImages(vinNumber: string, images: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ vin: vinNumber, images: images });
    return this.http.post(this.baseUrl + 'multiple-images/', body, { headers: headers });
  }
  




}
