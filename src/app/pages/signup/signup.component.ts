import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  userMessage = '';
  userDetails = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    isAdmin: false,
  };

  adminApproved: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAdminApprovalStatus().subscribe((approved) => {
      this.adminApproved = approved;
    });
  }

  submitForm() {
    this.http
      .post('https://reqres.in/api/users', this.userDetails)
      .subscribe((response) => {
        console.log('User submitted successfully!', response);
        this.userService.addUser(this.userDetails);

        if (!this.adminApproved) {
          this.userService.approveFirstUser();
        }
        this.clearForm();
        this.userMessage = 'Sign Up successful!';
      });
  }

  clearForm() {
    this.userDetails = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      isAdmin: false,
    };
  }
}
