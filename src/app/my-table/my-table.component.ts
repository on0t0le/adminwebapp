import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator} from '@angular/material';
import { MyTableDatasource } from './my-table-datasource';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  
  users: MyTableDatasource; 
  columnsToDisplay=['id', 'username', 'company.name'];

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor() { }
  
  ngOnInit() {
    
    this.users = new MyTableDatasource(this.paginator, this.sort);    
    
  }
}