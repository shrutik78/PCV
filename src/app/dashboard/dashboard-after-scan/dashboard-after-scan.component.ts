import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImagesService } from 'src/app/services/images.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard-after-scan',
  templateUrl: './dashboard-after-scan.component.html',
  styleUrls: ['./dashboard-after-scan.component.scss']
})
export class DashboardAfterScanComponent implements OnInit ,AfterViewInit{
baseUrl=`https://pcv.pythonanywhere.com/api`
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

constructor(private activeRoute:ActivatedRoute,private http:HttpClient,
  private router:Router,private image:ImagesService,){

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
  
  // Update isSelected method to handle different buttons
isSelected(img: any, tab: number): boolean {
  let selectedImagesArray;
  
  // Determine which array to use based on the active button
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
      return false; // If activeButton is unknown, return false
  }
  
  // Check if the image is selected in the selected images array
  return selectedImagesArray.some(selectedImg => selectedImg.image === img.image && selectedImg.tab === tab);
}

  
  
  // getSelectedImages(): any[] {
  //   return this.selectedImages.filter(img => img.selected);     
  // }
  
  
  selectedImagesAll:any[]=[]

  onImageSelected(selectedImage: any, tab: number) {
    let selectedImagesArray;
    
    // Determine which array to use based on the active button
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
        return; // If activeButton is unknown, do nothing
    }
    
    // Unselect previously selected images in the same tab
    selectedImagesArray = selectedImagesArray.filter(img => img.tab !== tab);
  
    // Check if the image is already selected
    const index = selectedImagesArray.findIndex(img => img.image === selectedImage.image && img.tab === tab);
  
    if (index !== -1) {
      // If already selected, remove it
      selectedImagesArray.splice(index, 1);
    } else {
      // If not selected, add it
      selectedImagesArray.push({ ...selectedImage, tab, selected: true });
    }
    
    // Update the selected images array based on the active button
    switch (this.activeButton) {
      case 'FrontLeft':
        this.selectedImagesFrontLeft = selectedImagesArray;
        console.log(this.selectedImagesFrontLeft)
        break;
      case 'FrontRight':
        this.selectedImagesFrontRight = selectedImagesArray;
        console.log(this.selectedImagesFrontRight)
        break;
      case 'RearLeft':
        this.selectedImagesRearLeft = selectedImagesArray;
        console.log(this.selectedImagesRearLeft)
        break;
      case 'RearRight':
        this.selectedImagesRearRight = selectedImagesArray;
        console.log(this.selectedImagesRearRight)
        break;
      default:
        break;
    }
    
    this.visitedTabs.add(tab);

  }


  
  


isSubmitted: boolean = false;
isFrontLeftDisabled: boolean = false;
isFrontRightDisabled: boolean = false;
isRearLeftDisabled: boolean = false;
isRearRightDisabled: boolean = false; 
isButtonDivVisible = true;
 selectedImagesArray:any[]=[];
onSubmit() {
  this.isSubmitted = true;
 
  switch (this.activeButton) {
    case 'FrontLeft':
      this.activeDiv = 5; 

      break;
    case 'FrontRight':
      this.activeDiv = 4;
      break;
    case 'RearLeft':
      this.activeDiv = 3; 
      break;
    case 'RearRight':
      this.activeDiv = 4; 
      break;
    default:
      
      break;
  }
}


// onSubmit() {
//   this.isSubmitted = true;
  
//   // Check if all images from the active button are selected
//   let allImagesSelected = false;
//   switch (this.activeButton) {
//     case 'FrontLeft':
//       allImagesSelected = this.selectedImagesFrontLeft.length > 0 && this.selectedImagesFrontLeft.every(img => img.selected);
//       if (allImagesSelected) {
//         this.activeDiv = 5;
//         this.isFrontLeftDisabled = true;
//       }
//       break;
//     case 'FrontRight':
//       allImagesSelected = this.selectedImagesFrontRight.length > 0 && this.selectedImagesFrontRight.every(img => img.selected);
//       if (allImagesSelected) {
//         this.activeDiv = 4;
//         this.isFrontRightDisabled = true;
//       }
//       break;
//     case 'RearLeft':
//       allImagesSelected = this.selectedImagesRearLeft.length > 0 && this.selectedImagesRearLeft.every(img => img.selected);
//       if (allImagesSelected) {
//         this.activeDiv = 3;
//         this.isRearLeftDisabled = true;
//       }
//       break;
//     case 'RearRight':
//       allImagesSelected = this.selectedImagesRearRight.length > 0 && this.selectedImagesRearRight.every(img => img.selected);
//       if (allImagesSelected) {
//         this.activeDiv = 4;
//         this.isRearRightDisabled = true;
//       }
//       break;
//     default:
//       break;
//   }

//   // Check if all four buttons are disabled to display the "Submit All" button
//   if (this.isFrontLeftDisabled && this.isFrontRightDisabled && this.isRearLeftDisabled && this.isRearRightDisabled) {
//     this.isButtonDivVisible = false;
//   }
// }

isAllButtonsDisabled(): boolean {
  return this.isFrontLeftDisabled && this.isFrontRightDisabled && this.isRearLeftDisabled && this.isRearRightDisabled;
}

submitAll() {
  this.selectedImagesAll = [
    ...this.selectedImagesFrontLeft,
    ...this.selectedImagesFrontRight,
    ...this.selectedImagesRearLeft,
    ...this.selectedImagesRearRight
  ];
}


onClick(){
    switch (this.activeButton) {
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

validationCheck(){
  Swal.fire({
    title: '',
    text: 'Car have completed all complexity validation check',
    icon: 'success',
    confirmButtonText: 'Ok',
    cancelButtonText: 'Cancel',
    showCancelButton: true,
    showConfirmButton: true
}).then((confirmation) => {
    if (confirmation.isConfirmed) {
  this.router.navigate(['/','dashboard'])
  }
})
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
            case 'Submit':
              this.isButtonDivVisible = !this.isButtonDivVisible;
         
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
