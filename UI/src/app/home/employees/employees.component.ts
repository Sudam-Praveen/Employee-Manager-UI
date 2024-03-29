import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {


  private apiServerUrl = 'http://localhost:8080';
  public allEmployees: any;
  public selectedEmployee: any;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.loadEmployees();
  }

  public employee = {
    name: null,
    email: null,
    jobTitle: null,
    phone: null,
    imageURL: null
  };

  public createEmployee() {

    this.http.post(`${this.apiServerUrl}/employee/add`, this.employee)
      .subscribe( data => {
     console.log(data);
        
     Swal.fire({
      title: "Added successfully!",
      html: `The Employee <b style="color: Green;">"${this.employee.name}"</b>  is Added successfully`,
      icon: "success"
          });

        this.employee = {
          name: null,
          email: null,
          jobTitle: null,
          phone: null,
          imageURL: null
        };
        this.loadEmployees();

        
      })
  }
  loadEmployees() {
    this.http.get(`${this.apiServerUrl}/employee/all`)
      .subscribe(data => {
        // console.log(data);
        this.allEmployees = data;

      })
  }
  clearFields() {
    this.employee = {
      name: null,
      email: null,
      jobTitle: null,
      phone: null,
      imageURL: null
    };
  }
  setParticularEmployee(employee: any) {
    this.selectedEmployee = employee;
  }
  public updateEmployee(employee: any) {

    this.http.put(`${this.apiServerUrl}/employee/update`, this.selectedEmployee)
      .subscribe(data => {
        console.log(data);
        Swal.fire({
          title: "Updated!",
          html: `The Employee <b style="color: blue;">"${this.selectedEmployee.name}"</b>  is updated`,
          icon: "success"
              });
        this.selectedEmployee = null;
        this.loadEmployees();
      })
  }
  public removeEmployee() {

    this.http.delete(`${this.apiServerUrl}/employee/delete/${this.selectedEmployee.id}`,{ responseType: 'text' })
      .subscribe((data) => {
        console.log("Deleted Successfuly");

        Swal.fire({
          title: "Deleted!",
          html: `The Employee <b style="color: red;">"${this.selectedEmployee.name}"</b>  is deleted`,
          icon: "success"
              });
        this.selectedEmployee = null;
       this.loadEmployees();
      })
     
  }
  
  
  public searchEmployees(key: string) {
    console.log(key);
    const results: any[] = [];
    for (const employee of this.allEmployees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.allEmployees = results;
    if (results.length === 0 || !key) {
      this.loadEmployees();
    }
  }
}
