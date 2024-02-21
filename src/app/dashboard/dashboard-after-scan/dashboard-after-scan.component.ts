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
// baseUrl=`https://pcv.pythonanywhere.com/api`
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

constructor(private activeRoute:ActivatedRoute,private http:HttpClient,
  private router:Router,private image:ImagesService,){

  }
  ngAfterViewInit(): void {
    
  }

 
ngOnInit(): void {

  
    this.vinNumber =  this.activeRoute.snapshot.params['vinNumber']
   
    console.log(this.wheelData)
    // this.http.get(`https://pcv.pythonanywhere.com/api/scan/${this.vinNumber}/`).subscribe((res:any)=>{
    //   console.log("response", res)
    //   this.data=res.data;
    // })
    this.http.get(`http://192.168.29.78:8000/api/scan/${this.vinNumber}/`).subscribe((res:any)=>{
      console.log("response", res)
      this.data=res.data;
    })
    this.loadImages();
}

loadImages(){
  this.getHubCapImages();
  this.getMirrorImages();
  this.getdoorHandleImages();
  this.getdoorImages();
  this.gethoodImages();
  this.getlightImages();
  this.getlogoImages();
  this.getroofImages();
  this.gettrunkImages();
  this.getwheelImages();
  this.getwindowImages();
  this.getwiperImages();
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
  console.log(this.doorData)
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
//Front Right
  getwheelImages(){

    this.image.getFRWheelImages().subscribe((data:any)=>{   
      this.wheelData=data.WheelImages;
      console.log(this.wheelData)
    });
  }

  getroofImages(){
    this.image.getFRRoofImages().subscribe((data:any)=>{
      this.roofData=data.RoofImages;
      console.log(this.roofData)
    })
  }

  getMirrorImages(){
    this.image.getFRMirrorImages().subscribe((data:any)=>{
      this.mirrorData=data.OutSideMirrorImages;
      console.log(this.mirrorData)
    })
  }

//Rear right
  getlogoImages(){
    this.image.getRRLogoImages().subscribe((data:any)=>{
      this.logoData=data.LogoImages;
      console.log(this.logoData)
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
    console.log(this.trunkData)
  })
}
getlightImages(){
  this.image.getRLLightImages().subscribe((data:any)=>{
    this.lightData=data.TailLightImages;
    console.log(this.lightData)
  })
}

  selectedImagesAll:any[]=[]
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
  
    // Check if the image is selected in the selected images array for the given tab
    return selectedImagesArray.some(selectedImg => selectedImg.image === img.image && selectedImg.tab === tab);
  }
  
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
        break;
      case 'FrontRight':
        this.selectedImagesFrontRight = selectedImagesArray;
        break;
      case 'RearLeft':
        this.selectedImagesRearLeft = selectedImagesArray;
        break;
      case 'RearRight':
        this.selectedImagesRearRight = selectedImagesArray;
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

 showSelectedImages: boolean = false;
 onSubmit() {
  this.isSubmitted = true;
  // Determine the appropriate value of activeDiv based on activeButton
  switch (this.activeButton) {
    case 'FrontLeft':
      this.activeDiv = 5; 
      this.selectedImagesArray=this.selectedImagesFrontLeft ;
        console.log(this.selectedImagesFrontLeft)
      break;
    case 'FrontRight':
      this.activeDiv = 4;
      this.selectedImagesArray=this.selectedImagesFrontRight;
      console.log(this.selectedImagesFrontRight)
      break;
    case 'RearLeft':
      this.activeDiv = 3; 
        this.selectedImagesArray=this.selectedImagesRearLeft;
      console.log(this.selectedImagesRearLeft)
      break;
    case 'RearRight':
      this.activeDiv = 4; 
       this.selectedImagesArray=this.selectedImagesRearRight;
      console.log(this.selectedImagesRearRight)
      break;
    default:
      break;
  }


}
  

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
  console.log(this.selectedImagesAll)
}


Validate() {

  this.image.getAllImages(this.vinNumber,this.selectedImagesAll).subscribe(
 (response:any) => {
        if(response.status =='OK'){
          Swal.fire({
            title: '',
            text: 'Car have completed all complexity validation check',
            icon: 'success',
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            showConfirmButton: true,
            position:'center',
            width:'20rem',
        }).then((confirmation) => {
            if (confirmation.isConfirmed) {
            this.router.navigate(['/','dashboard'])
          }
        })
          console.log('Images submitted successfully:', response);
        }
       
        else if (response.status == 'NOT OK') {
          // const missingImages = response.missing_images.join(', ') ${missingImages};
          Swal.fire({
            title: '',
            html: `Not completed complexity validation check. Missing images: <br/>`,
            icon: 'error',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            showConfirmButton: true,
            position:'center',
            width:'20rem',
          
          }).then((confirmation) => {
            if (confirmation.isConfirmed) {
              // Handle user confirmation if needed
            }
          });
        }
      },
    
      error => {

        console.error('Error submitting images:', error);
      }
    );
}


onClick(button:string){
this.activeButton=button;
this.activeDiv=1;
    switch (button) {
        case 'FrontLeft':
            this.isButtonDivVisible = !this.isButtonDivVisible;
            this.isFrontLeftDisabled = true;
             break;
        case 'FrontRight':
           this.isButtonDivVisible = !this.isButtonDivVisible;
            this.isFrontRightDisabled = true;             
            break;
        case 'RearLeft':  
          
            this.isButtonDivVisible = !this.isButtonDivVisible;
                this.isRearLeftDisabled = true;
             
                break;
                         
        case 'RearRight':
 
            this.isButtonDivVisible = !this.isButtonDivVisible;
            this.isRearRightDisabled = true;
         
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
            case 'RearLeft':
              this.isButtonDivVisible = !this.isButtonDivVisible;
              this.isRearLeftDisabled = true;
          
              break;      
        case 'RearRight':
            this.isButtonDivVisible = !this.isButtonDivVisible;
            this.isRearRightDisabled = true;
          
            break; 
        case 'Submit':
              this.isButtonDivVisible = !this.isButtonDivVisible;
              break;
            
        default:
            break;
    }
}  

activeDiv: number=1 ;
switchDiv(divNumber: number) {
 
  const imagesSelected = this.checkIfImageSelected();
  if (!imagesSelected) {
    // Display a message if no image is selected
    alert("Please select an image before switching tabs.");
    return; 
  }
  // Update the active tab
  this.activeDiv = divNumber;
}

nextTab() {
  // Check if there are selected images for the current tab
  const imagesSelected = this.checkIfImageSelected();

  if (!imagesSelected) {
      // If no image is selected, display an alert
      alert("Please select an image before moving to the next tab.");
      return; 
  }

  // Move to the next tab
  if (this.activeDiv < 5) { 
      this.activeDiv++;
  }
}

checkIfImageSelected(): boolean {
  // Logic to check if any image is selected in the current tab
  let selectedImagesArray;
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

  return selectedImagesArray.some(img => img.tab === this.activeDiv);
}

back(){
    this.activeDiv--
    if(this.activeDiv<1){
      this.activeDiv=5
    }
}


}
