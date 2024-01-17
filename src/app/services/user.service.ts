import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: any[] = [];
  private adminApproved: boolean = false;
  private adminApprovalSubject = new BehaviorSubject<boolean>(
    this.adminApproved
  );

  constructor() {
    // Load users from session storage on service initialization
    const storedUsers = sessionStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  getUsers(): any[] {
    return this.users;
  }

  saveUsersToStorage(): void {
    // Save users to session storage
    sessionStorage.setItem('users', JSON.stringify(this.users));
  }

  addUser(user: any): void {
    this.users.push({ ...user, approved: false, tempKey: null });
    this.saveUsersToStorage();
  }

  approveFirstUser(): void {
    if (!this.adminApproved && this.users.length > 0) {
      this.users[0].approved = true;
      this.generateTempKey(this.users[0]);
      this.adminApproved = true;
      this.adminApprovalSubject.next(this.adminApproved);
      this.saveUsersToStorage();
    }
  }

  generateTempKey(user: any): void {
    const tempKey = Math.random().toString(36).substring(2, 15);
    user.tempKey = tempKey;
  }

  getAdminApprovalStatus(): Observable<boolean> {
    return this.adminApprovalSubject.asObservable();
  }

  getApprovedUserByTempKey(userDetails: any): any {
    return this.users.find(
      (user) =>
        user.approved &&
        user.tempKey !== null &&
        userDetails.email === user.email &&
        userDetails.password === user.password
    );
  }

  updateUserData(updatedUser: any): void {
    const index = this.users.findIndex(
      (user) => user.approved && user.tempKey === updatedUser.tempKey
    );
    if (index !== -1) {
      // Users can update their own information
      this.users[index] = { ...this.users[index], ...updatedUser };
    }
    this.saveUsersToStorage();
  }

  removeUser(tempKey: string): void {
    const index = this.users.findIndex(
      (user) => user.approved && user.tempKey === tempKey
    );
    if (index !== -1) {
      // Users cannot remove themselves
      this.users.splice(index, 1);
    }
    this.saveUsersToStorage();
  }
}
