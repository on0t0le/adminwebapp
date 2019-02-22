import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';

export class UsersTableDatasource extends DataSource<any>{
    
    constructor(private usersService: UsersService){
        super();
    }

    connect(): Observable<User[]>{
        return this.usersService.getUsers();
    }   
    
    disconnect() {        
    }


}
