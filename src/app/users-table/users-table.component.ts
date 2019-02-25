import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../models/User';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  dataSource: any;
  columnsToDisplay = ['id', 'username', 'email'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(res =>{      
      this.dataSource = new MatTableDataSource(res as User[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}