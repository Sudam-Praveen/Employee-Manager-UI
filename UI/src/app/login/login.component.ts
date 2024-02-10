import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import AOS from 'aos';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Import Router module

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Note: Change 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  private apiServerUrl = 'http://localhost:8080';
  
  constructor(private httpClient: HttpClient, private router: Router) {} // Inject Router service into the constructor

  ngOnInit() {
    AOS.init({
      duration: 1000
    });
  }

  public user = {
    email: null,
    password: null
  };

  userLgin() {
    this.httpClient.put(`${this.apiServerUrl}/login/check`, this.user, { responseType: 'text' })
      .subscribe(
        (data: any) => {
          console.log(data);
          Swal.fire({
            title: 'Updated!',
            html: `The User <b style="color: blue;">Valid User</b> `,
            icon: 'success'
          }).then(() => {
            // Navigate to another component upon successful login
            this.router.navigate(['/Employee']); // Replace '/Employee' with the route to your employee component
          });
        },
        (error: any) => {
          console.error('Error user ', error);
          Swal.fire({
            title: 'Error!',
            html: 'Invalid Login please check the password',
            icon: 'error'
          });
        }
      );
  }
}
