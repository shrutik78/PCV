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

  validateVIN(value: string): boolean {
    // VIN should be exactly 17 characters long
    if (value.length !== 17) {
      return false;
    }
  
    // VIN can only contain alphanumeric characters except for I, O, and Q
    if (!/^[A-HJ-NPR-Z0-9]+$/.test(value)) {
      return false;
    }
  
    // Check digit calculation
    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
    const values: { [key: string]: number } = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4,
      N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
      1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 0
    };
  
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += values[value[i]] * weights[i];
    }
  
    // Check digit should match
    return value[8] === String((sum % 11) % 10);
  }
  
  getValue(value: string) {
    this.show = false;
    console.log("Scanned barcode:", value);
  
    // Perform validation here
    const isValidVIN = this.validateVIN(value);

  
    if (isValidVIN ) {
      // Navigate to the next route if the value is valid
      this.route.navigate(['/dashboard', value]);
    } else {
      // Show error message to the user
      alert("Invalid VIN")
      // You can also show a message to the user using a toast, alert, or any other UI component
    }
  }


// getValue(value:any){
//   this.show=false;
//   console.log("Scanned barcode:", value);
// //   Swal.fire({
// //     title: 'Barcode Scanned',
// //     text: 'Confirm to move forward with number---'+value,
// //     icon: 'info',
// //     confirmButtonText: 'Confirm',
// //     cancelButtonText: 'Cancel',
// //     showCancelButton: true,
// //     showConfirmButton: true
// // }).then((confirmation) => {
// //     if (confirmation.isConfirmed) {
//       this.route.navigate(['/','dashboard',value])
//     // }
// // })

// }


}
