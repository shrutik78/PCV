import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImagesService } from 'src/app/services/images.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-dashboard-after-scan',
  templateUrl: './dashboard-after-scan.component.html',
  styleUrls: ['./dashboard-after-scan.component.scss']
})
export class DashboardAfterScanComponent implements OnInit {
baseUrl=`http://192.168.29.78:8000/api`
vinNumber:any
data:any;
wheelData:any[]=[];
roofData:any[]=[];
logoData:any[]=[];
  constructor(private activeRoute:ActivatedRoute,private http:HttpClient,private router:Router,private image:ImagesService){

  }
 
ngOnInit(): void {

    this.getwheelImages()
    this.getlogoImages()
    this.getroofImages()
    this.vinNumber =  this.activeRoute.snapshot.params['vinNumber']
   
    console.log(this.wheelData)
    this.http.get(`http://192.168.29.78:8000/api/scan/${this.vinNumber}/`).subscribe((res:any)=>{
      console.log("response", res)
      this.data=res.data;
    })
 
}





  getwheelImages(){
    this.image.getWheelImages().subscribe((data:any)=>{   
      this.wheelData=data.WheelImages;
    });
  }

  getroofImages(){
    this.image.getRoofImages().subscribe((data:any)=>{
      this.roofData=data.RoofImages;
    })
  }

  getlogoImages(){
    this.image.getLogoImages().subscribe((data:any)=>{
      this.logoData=data.LogoImages;
    })
  }


  selectedImages:any[]=[]


  selectedImagesFrontLeft: any[] = [];
  selectedImagesFrontRight: any[] = [];
  selectedImagesRearLeft: any[] = [];
  selectedImagesRearRight: any[] = [];
  
  lastSelectedTab: number = 1;
  visitedTabs: Set<number> = new Set();
  
  isSelected(img: any, tab: number): boolean {
    return this.selectedImages.some(selectedImg => selectedImg.image === img.image && selectedImg.tab === tab);
  }
  
  getSelectedImages(): any[] {

    return this.selectedImages.filter(img => img.selected);
     
  }
  
  getAllImages():any[]{
    let allSelectedImages: any[] = [];
    allSelectedImages = allSelectedImages.concat(this.selectedImagesFrontLeft);
    allSelectedImages = allSelectedImages.concat(this.selectedImagesFrontRight);
    allSelectedImages = allSelectedImages.concat(this.selectedImagesRearLeft);
    allSelectedImages = allSelectedImages.concat(this.selectedImagesRearRight);
    return allSelectedImages;
  
  }
  
  
  onImageSelected(selectedImage: any, tab: number,button:string) {

    let selectedImagesArray;
        switch (button) {
            case 'FrontLeft':
                selectedImagesArray = this.selectedImagesFrontLeft;
                break;
            case 'FrontRight':
                selectedImagesArray = this.selectedImagesFrontRight;
                break;
            case 'RearLeft':
                selectedImagesArray = this.selectedImagesRearLeft;
                break;
            case 'RearRight':
                selectedImagesArray = this.selectedImagesRearRight;
                break;
            default:
                break;
        }

    this.lastSelectedTab = tab;
    // Unselect the previously selected images in the same tab
    this.selectedImages = this.selectedImages.filter(img => !(img.tab === tab));
  
    // Check if the image is already selected
    const index = this.selectedImages.findIndex(img => img.image === selectedImage.image && img.tab === tab);
  
    if (index !== -1) {
      // If already selected, remove it
      this.selectedImages.splice(index, 1);
    } else {
      // If not selected, add it
      this.selectedImages.push({ ...selectedImage, tab, selected: true });
    }
  
    this.visitedTabs.add(tab);
  
    // Check if all tabs have been visited
    if (this.visitedTabs.size === 3 && this.selectedImages.length === 3) {
      this.activeDiv = 4;
    }
  }
isSubmitted: boolean = false;
isFrontLeftDisabled: boolean = false;
isFrontRightDisabled: boolean = false;
isRearLeftDisabled: boolean = false;
isRearRightDisabled: boolean = false; 
isButtonDivVisible = true;

onSubmit(){
  this.isSubmitted = true;
  // this.activeDiv=4
  this.isButtonDivVisible=true
  this.isFrontLeftDisabled=true; 
  console.log(this.selectedImages)
  
}

activeButton: string = '';

toggleDivs(button: string) {
    this.activeButton = button;
    switch (button) {
        case 'FrontLeft':
            this.isButtonDivVisible = !this.isButtonDivVisible;
            this.isFrontLeftDisabled = true;
            break;
        case 'FrontRight':
            this.isButtonDivVisible = !this.isButtonDivVisible;
            this.isFrontRightDisabled = true;
            break;
        case 'RearRight':
            this.isButtonDivVisible = !this.isButtonDivVisible;
            this.isRearRightDisabled = true;
            break; 
       case 'RearLeft':
            this.isButtonDivVisible = !this.isButtonDivVisible;
            this.isRearLeftDisabled = true;
            break;           
        default:
            break;
    }
}  

activeDiv: number = 1;
switchDiv(divNumber: number) {
  this.activeDiv = divNumber;
}
next(){
  this.activeDiv++
  if(this.activeDiv>5){
    this.activeDiv=1
  }
}
back(){
    this.activeDiv--
    if(this.activeDiv<1){
      this.activeDiv=5
    }
}

 





}
