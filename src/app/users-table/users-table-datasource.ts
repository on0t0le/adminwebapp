import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';
import { catchError } from 'rxjs/operators';

export class UsersTableDatasource extends DataSource<any>{
    
    private usersSubject = new BehaviorSubject<User[]>([]);

    constructor(private usersService: UsersService){
        super();
    }

    connect(): Observable<User[]>{
        //return this.usersService.getUsers();
        return this.usersSubject.asObservable();
    }   
    
    disconnect() {        
    }

    loadUsers(filter = '', sortDirection = 'asc', pageIndex = 0, pageSize=5){
        this.usersService.getUsers().pipe(
            catchError(() => of([]))
            ).subscribe(users => this.usersSubject.next(users));
    }

}
