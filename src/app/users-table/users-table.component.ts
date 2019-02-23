import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UsersTableDatasource } from './users-table-datasource';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  //dataSource = new UsersTableDatasource(this.usersService);
  dataSource: UsersTableDatasource;
  columnsToDisplay = ['id', 'username', 'email'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.dataSource = new UsersTableDatasource(this.usersService);
    this.dataSource.loadUsers('',this.paginator);
  }

}