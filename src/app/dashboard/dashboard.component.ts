import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  value!: string;
  isError = false;
  show:boolean=false

constructor(private route:Router){

}

  openWindow(){
    this.show=!this.show
  }
  onError(error:any) {
    console.error(error);
    this.isError = true;
  }

getValue(value:any){
  this.show=false;
  console.log("Scanned barcode:", value);
//   Swal.fire({
//     title: 'Barcode Scanned',
//     text: 'Confirm to move forward with number---'+value,
//     icon: 'info',
//     confirmButtonText: 'Confirm',
//     cancelButtonText: 'Cancel',
//     showCancelButton: true,
//     showConfirmButton: true
// }).then((confirmation) => {
//     if (confirmation.isConfirmed) {
      this.route.navigate(['/','dashboard',value])
    // }
// })

}


}
