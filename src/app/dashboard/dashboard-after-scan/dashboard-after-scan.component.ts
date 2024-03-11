import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImagesService } from 'src/app/services/images.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

interface TotalTabs{
  [key: string]: number;
}

@Component({
  selector: 'app-dashboard-after-scan',
  templateUrl: './dashboard-after-scan.component.html',
  styleUrls: ['./dashboard-after-scan.component.scss']
})
export class DashboardAfterScanComponent implements OnInit ,AfterViewInit{
// baseUrl=`https://pcv.pythonanywhere.com/api`
// baseUrl=`http://192.168.29.78:8000/api`
baseUrl=environment.baseUrl
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
  private router:Router,private imageService:ImagesService,
  private snackBar: MatSnackBar){
  
  }
  ngAfterViewInit(): void {
    this.loadImages();
  }

 
ngOnInit(): void {

  
    this.vinNumber =  this.activeRoute.snapshot.params['vinNumber']
   
    console.log(this.wheelData)
    this.imageService.getData(this.vinNumber).subscribe((res: any) => {
      console.log("response", res);
      this.data=res.data
    });
    // this.http.get(`http://192.168.29.78:8000/api/scan/${this.vinNumber}/`).subscribe((res:any)=>{
    //   console.log("response", res)
    //   this.data=res.data;
    // })
  
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
  this.imageService.getFLWindowImages().subscribe((data:any)=>{
    this.windowData=data.WindowImages;
    console.log(this.windowData)
  })
}
getdoorImages(){
this.imageService.getFLDoorImages().subscribe((data:any)=>{
  this.doorData=data.DoorImages;
  console.log(this.doorData)
})
}
getdoorHandleImages(){
this.imageService.getFLHandleImages().subscribe((data:any)=>{
  this.handleData=data.DoorHandleImages;
  console.log(this.handleData)
})
}
getHubCapImages(){
this.imageService.getFLCapImages().subscribe((data:any)=>{
  this.hubcapData=data.LogoImages;
  console.log(this.hubcapData)
})
}
//Front Right
  getwheelImages(){

    this.imageService.getFRWheelImages().subscribe((data:any)=>{   
      this.wheelData=data.WheelImages;
      console.log(this.wheelData)
    });
  }

  getroofImages(){
    this.imageService.getFRRoofImages().subscribe((data:any)=>{
      this.roofData=data.RoofImages;
      console.log(this.roofData)
    })
  }

  getMirrorImages(){
    this.imageService.getFRMirrorImages().subscribe((data:any)=>{
      this.mirrorData=data.OutSideMirrorImages;
      console.log(this.mirrorData)
    })
  }

//Rear right
  getlogoImages(){
    this.imageService.getRRLogoImages().subscribe((data:any)=>{
      this.logoData=data.LogoImages;
      console.log(this.logoData)
    })
  }
   
  getwiperImages(){
    this.imageService.getRRWiperImages().subscribe((data:any)=>{
      this.wiperData=data.WiperImages;
      console.log(this.wiperData)
    })
  }

gethoodImages(){
  this.imageService.getRRHoodImages().subscribe((data:any)=>{
    this.hoodData=data.HoodImages;
    console.log(this.hoodData)
  })
}
//Rear left
gettrunkImages(){
  this.imageService.getRLTrunkImages().subscribe((data:any)=>{
    this.trunkData=data.TrunkImages;
    console.log(this.trunkData)
  })
}
getlightImages(){
  this.imageService.getRLLightImages().subscribe((data:any)=>{
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
  
  totalTabs: TotalTabs = {
    FrontLeft:4,
    FrontRight: 3,
    RearLeft: 2,
    RearRight: 3
  };
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
  
  // onImageSelected(selectedImage: any, tab: number) {
  //   let selectedImagesArray;
    
  //   // Determine which array to use based on the active button
  //   switch (this.activeButton) {
  //     case 'FrontLeft':
  //       selectedImagesArray = this.selectedImagesFrontLeft;
  //       break;
  //     case 'FrontRight':
  //       selectedImagesArray = this.selectedImagesFrontRight;
  //       break;
  //     case 'RearLeft':
  //       selectedImagesArray = this.selectedImagesRearLeft;
  //       break;
  //     case 'RearRight':
  //       selectedImagesArray = this.selectedImagesRearRight;
  //       break;
  //     default:
  //       return; // If activeButton is unknown, do nothing
  //   }
    
  //  // Clear selection in the current tab
  //  selectedImagesArray = selectedImagesArray.filter(img => img.tab !== tab);

  //  // Add the new selection
  //  selectedImagesArray.push({ ...selectedImage, tab, selected: true });
  
  //   // Update the selected images array based on the active button
  //   switch (this.activeButton) {
  //     case 'FrontLeft':
  //       this.selectedImagesFrontLeft = selectedImagesArray;
  //       break;
  //     case 'FrontRight':
  //       this.selectedImagesFrontRight = selectedImagesArray;
  //       break;
  //     case 'RearLeft':
  //       this.selectedImagesRearLeft = selectedImagesArray;
  //       break;
  //     case 'RearRight':
  //       this.selectedImagesRearRight = selectedImagesArray;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  onImageSelected(selectedImage: any, tab: number) {
    let selectedImagesArray = this.getSelectedImagesArray();
  
    selectedImagesArray = selectedImagesArray.filter(img => img.tab !== tab);
  
    const index = selectedImagesArray.findIndex(img => img.image === selectedImage.image && img.tab === tab);
  
    if (index !== -1) {
        selectedImagesArray.splice(index, 1);
    } else {
        selectedImagesArray.push({ ...selectedImage, tab, selected: true });
    }
  
    this.updateSelectedImagesArray(selectedImagesArray);
  
    this.visitedTabs.add(tab);
    this.changedTab = tab;
  
    const totalTabsForSection = this.totalTabs[this.activeButton];
    const nextTab = tab + 1;
  
    if (nextTab <= totalTabsForSection) {
        setTimeout(() => {
            this.activeDiv = nextTab;
        }, 200);
    } 
}

 getSelectedImagesArray(): any[] {
    switch (this.activeButton) {
        case 'FrontLeft':
            return this.selectedImagesFrontLeft;
        case 'FrontRight':
            return this.selectedImagesFrontRight;
        case 'RearLeft':
            return this.selectedImagesRearLeft;
        case 'RearRight':
            return this.selectedImagesRearRight;
        default:
            return [];
    }
}

updateSelectedImagesArray(selectedImagesArray: any[]) {
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
}

  
  // else {
    //   // If it's the last tab, switch to the end tab
    //   setTimeout(() => {
    //     this.activeDiv = this.totalTabs[this.activeButton]; // Switch to the end tab
    //     this.onSubmit();
    //   }, 200); // You can adjust the timeout value as needed
    // }
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

showMissingImages: boolean = false;
missingImages: string[] = []; 

Validate() {
  this.imageService.getAllImages(this.vinNumber, this.selectedImagesAll).subscribe(
    (response: any) => {
      if (response.status == 'OK') {
        Swal.fire({
          title: '',
          text: 'Car has completed all complexity validation checks.',
          icon: 'success',
          confirmButtonText: 'Submit',
          showCancelButton: true,
          showConfirmButton: true,
        }).then((confirmation) => {
          if (confirmation.isConfirmed) {
            console.log('User clicked Submit');
            this.printMessage('OK', this.vinNumber); // Call the printMessage function with VIN number
            this.router.navigate(['/','dashboard']);
          }
        });
        console.log('Images submitted successfully:', response);
      } else if (response.status == 'NOT OK') {
        this.missingImages = response.missing_images;
        Swal.fire({
          title: '',
          html: `Not completed complexity validation check. <br/>`,
          icon: 'error',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          showConfirmButton: true,
        }).then((confirmation) => {
          if (confirmation.isConfirmed) {
            // Set showMissingImages to true when the user clicks OK
            this.showMissingImages = true;
          }
        });
      }
    },
    (error) => {
      console.error('Error submitting images:', error);
    }
  );
}

printMessage(message: string, vinNumber: string) {
  const printContent = document.createElement('div');
  printContent.style.textAlign = 'center';
  printContent.style.margin = 'auto';
  printContent.style.maxWidth = '80%';
  printContent.innerHTML = `
    <div>${vinNumber}</div>
    <br><br>
    <div><h1>${message}</h1></div>
  `;
  document.body.appendChild(printContent);
  window.print();
  document.body.removeChild(printContent);
}



submit(){
  return this.router.navigate(['dashboard'])
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
            this.isButtonDivVisible =!this.isButtonDivVisible;
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
    this.snackBar.open('Please select an image before switching tabs.', 'Close', {
      duration: 4000, 
      verticalPosition: 'top',
      // panelClass: ['error-snackbar'], 
    });
    return
  }
  // Update the active tab
  this.activeDiv = divNumber;
}

nextTab() {
  // Check if there are selected images for the current tab
  const imagesSelected = this.checkIfImageSelected();

  if (!imagesSelected) {
      // If no image is selected, display an alert
      this.snackBar.open('Please select an image before switching tabs.', 'Close', {
        duration: 4000, 
        verticalPosition: 'top',
        panelClass: ['error-snackbar'], 
      });
      return; 
  }

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

changedTab:any;
// back() {
//   // If back is clicked after changing the selected image in a particular tab,
//   // Navigate back to that tab and then proceed to the last tab
//   if (this.changedTab) {
//     this.activeDiv = this.changedTab;
//     this.changedTab = null;
//   } else {
//     // If back is clicked without changing the selected image in a particular tab,
//     // Navigate to the previous tab or loop back to the last tab if on the first tab
//     if (this.activeDiv === 1) {
//       this.activeDiv = this.totalTabs[this.activeButton];
//     } else {
//       this.activeDiv--;
//     }

//   }
// }
}