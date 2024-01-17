import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userMessage = '';
  userDetails = {
    email: '',
    password: '',
  };

  constructor(private userService: UserService) {}

  submitForm(form: any): void {
    const user = this.userService.getApprovedUserByTempKey(this.userDetails);
    if (user) {
      console.log('Login successful!', user);
      window.location.replace('/dashboard');
      // Add logic to redirect or handle successful login
    } else {
      this.userMessage = 'Invalid user!';
    }
  }
}
