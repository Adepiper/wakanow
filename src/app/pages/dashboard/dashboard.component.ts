import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserDetails } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private userService: UserService) {}

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'email',
    'isAdmin',
    'approved',
  ];
  dataSource = new MatTableDataSource<UserDetails>(this.userService.getUsers());

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
