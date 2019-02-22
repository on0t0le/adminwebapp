import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UsersTableDatasource } from './users-table-datasource';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  dataSource = new UsersTableDatasource(this.usersService);
  columnsToDisplay = ['id', 'username'];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

}