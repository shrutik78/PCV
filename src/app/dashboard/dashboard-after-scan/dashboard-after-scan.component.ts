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
    // this.wheelData.forEach(wheel => {
    //   wheel.checked = false;
    // });  this.logoData.forEach(logo => {
    //   logo.checked = false;
    // }); this.roofData.forEach(roof =>{
    //   roof.checked =false;
    // })
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
handleCheckboxChange(index: number): void {
  const selectedWheel = this.wheelData[index];

  // Toggle the checked state
  selectedWheel.checked = !selectedWheel.checked;

  // Add or remove from the selectedImages array based on the checked state
  if (selectedWheel.checked) {
    this.selectedImages.push(selectedWheel.image);
  } else {
    const indexToRemove = this.selectedImages.indexOf(selectedWheel.image);
    if (indexToRemove !== -1) {
      this.selectedImages.splice(indexToRemove, 1);
    }
  }
}


  
  // selectedImages: any[] = [];
  visitedTabs: Set<number> = new Set();
  
  isSelected(img: any, tab: number): boolean {
    return this.selectedImages.some(selectedImg => selectedImg.image === img.image && selectedImg.tab === tab);
  }
  
  getSelectedImages(): any[] {
    return this.selectedImages.filter(img => img.selected);
  }
  
  onImageSelected(selectedImage: any, tab: number) {
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
onSubmit(){
  this.isSubmitted = true;
  // this.activeDiv=4
  this.isButtonDivVisible=true
  console.log(this.selectedImages)
  
}

  // selectedImage: any = null;  // Variable to store the selected image

  // onCheckboxChange(img: any, dataType: string) {
  //   switch (dataType) {
  //     case 'wheelData':
  //       this.handleCheckboxChange(img, this.wheelData);
  //       break;
  //     case 'roofData':
  //       this.handleCheckboxChange(img, this.roofData);
  //       break;
  //     case 'logoData':
  //       this.handleCheckboxChange(img, this.logoData);
  //       break;
  //     // Add more cases if needed for other data types
  
  //     default:
  //       break;
  //   }
  // }
  
  // private handleCheckboxChange(img: any, data: any[]) {
  //   // Unselect all other images in the same data array
  //   data.forEach((item: any) => {
  //     if (item !== img) {
  //       item.isSelected = true;
  //     }
  //   });
  
  //   // Set the selected image
  //   this.selectedImage = img.isSelected ? img : null;
  // }
  
  

activeDiv: number = 1;
switchDiv(divNumber: number) {
  this.activeDiv = divNumber;
}
next(){
  this.activeDiv++
  if(this.activeDiv>4){
    this.activeDiv=1
  }
}
back(){
    this.activeDiv--
    if(this.activeDiv<1){
      this.activeDiv=4
    }
}

  isButtonDivVisible = true;
  toggleDivs() {
    this.isButtonDivVisible = !this.isButtonDivVisible;
  }


}
