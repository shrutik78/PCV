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
export class DashboardAfterScanComponent implements OnInit ,AfterViewInit{
baseUrl=`http://192.168.29.78:8000/api`
vinNumber:any
data:any;
wheelData:any[]=[];
roofData:any[]=[];
logoData:any[]=[];
windowData:any[]=[];
handleData:any[]=[];
mirrorData:any[]=[];
hubcapData:any[]=[];
doorData:any[]=[]
wiperData:any[]=[];
hoodData:any[]=[];
trunkData:any[]=[];
lightData:any[]=[];

constructor(private activeRoute:ActivatedRoute,private http:HttpClient,private router:Router,private image:ImagesService){

  }
  ngAfterViewInit(): void {
    this.getwheelImages();
    this.getlogoImages();
    this.getroofImages();
    this.getHubCapImages();
    this.getMirrorImages();
    this.getdoorHandleImages();
    this.getdoorImages();
    this.gethoodImages();
    this.getlightImages();
    this.getwiperImages();
    this.gettrunkImages();
    this.getwindowImages();
  }
 
ngOnInit(): void {

  
    this.vinNumber =  this.activeRoute.snapshot.params['vinNumber']
   
    console.log(this.wheelData)
    this.http.get(`https://pcv.pythonanywhere.com/api/scan/${this.vinNumber}/`).subscribe((res:any)=>{
      console.log("response", res)
      this.data=res.data;
    })
 
}

//Front Right
  getwheelImages(){

    this.image.getFRWheelImages().subscribe((data:any)=>{   
      this.wheelData=data.WheelImages;
    });
  }

  getroofImages(){
    this.image.getFRRoofImages().subscribe((data:any)=>{
      this.roofData=data.RoofImages;
    })
  }

  getMirrorImages(){
    this.image.getFRMirrorImages().subscribe((data:any)=>{
      this.mirrorData=data.OutSideMirrorImages;
      console.log(this.mirrorData)
    })
  }
//Front Left
  getwindowImages(){
    this.image.getFLWindowImages().subscribe((data:any)=>{
      this.windowData=data.WindowImages;
      console.log(this.windowData)
    })
  }
getdoorImages(){
  this.image.getFLDoorImages().subscribe((data:any)=>{
    this.doorData=data.DoorImages;
  })
}
getdoorHandleImages(){
  this.image.getFLHandleImages().subscribe((data:any)=>{
    this.handleData=data.DoorHandleImages;
    console.log(this.handleData)
  })
}
getHubCapImages(){
  this.image.getFLCapImages().subscribe((data:any)=>{
    this.hubcapData=data.LogoImages;
    console.log(this.hubcapData)
  })
}
//Rear right
  getlogoImages(){
    this.image.getRRLogoImages().subscribe((data:any)=>{
      this.logoData=data.LogoImages;
    })
  }
   
  getwiperImages(){
    this.image.getRRWiperImages().subscribe((data:any)=>{
      this.wiperData=data.WiperImages;
      console.log(this.wiperData)
    })
  }

gethoodImages(){
  this.image.getRRHoodImages().subscribe((data:any)=>{
    this.hoodData=data.HoodImages;
    console.log(this.hoodData)
  })
}
//Rear left
gettrunkImages(){
  this.image.getRLTrunkImages().subscribe((data:any)=>{
    this.trunkData=data.TrunkImages;
  })
}
getlightImages(){
  this.image.getRLLightImages().subscribe((data:any)=>{
    this.lightData=data.TailLightImages;
    console.log(this.lightData)
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
  
  


  onImageSelected(selectedImage: any, tab: number) {
    let selectedImagesArray: any[];
    switch (this.activeButton) {
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
        selectedImagesArray = [];
        break;
    }

    // Unselect the previously selected images in the same tab
    selectedImagesArray = selectedImagesArray.filter(img => !(img.tab === tab));

    // Check if the image is already selected
    const index = selectedImagesArray.findIndex(img => img.image === selectedImage.image && img.tab === tab);

    if (index !== -1) {
      // If already selected, remove it
      selectedImagesArray.splice(index, 1);
    } else {
      // If not selected, add it
      selectedImagesArray.push({ ...selectedImage, tab, selected: true });
    }

    // Check if all tabs have been visited
    // if (this.visitedTabs.size === 4 && this.selectedImages.length === 4) {
    //   this.activeDiv = 5;
    // }
  }






isSubmitted: boolean = false;
isFrontLeftDisabled: boolean = false;
isFrontRightDisabled: boolean = false;
isRearLeftDisabled: boolean = false;
isRearRightDisabled: boolean = false; 
isButtonDivVisible = true;

onSubmit() {
  this.isSubmitted = true;
  switch (this.activeButton) {
    case 'FrontLeft':
      this.selectedImages = this.selectedImagesFrontLeft;
      console.log(this.selectedImages)
      break;
    case 'FrontRight':
      this.selectedImages = this.selectedImagesFrontRight;
      break;
    case 'RearLeft':
      this.selectedImages = this.selectedImagesRearLeft;

      break;
    case 'RearRight':
      this.selectedImages = this.selectedImagesRearRight;
    
      break;
    default:
      this.selectedImages = [];
      break;
  }
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
