import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';
import { catchError, map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';

export class UsersTableDatasource extends DataSource<any>{
    
    private usersSubject = new BehaviorSubject<User[]>([]);

    public totalLength = 0;

    constructor(private usersService: UsersService){
        super();
    }

    connect(): Observable<User[]>{
        //return this.usersService.getUsers();
        return this.usersSubject.asObservable();
    }   
    
    disconnect() {        
    }

    loadUsers(filter = '', paginator: MatPaginator){
        this.usersService.getUsers().pipe(
            map(data =>{
                
                console.log(data);
                this.totalLength = data.length;
                console.log(this.totalLength);
                paginator.length = data.length;

                return data;
            }),
            catchError(() => of([]))
            ).subscribe((users: User[]) => 
            {
                console.log('Start to inser users');
                this.usersSubject.next(users);
                console.log('Users are inserted!');
                console.log(users);
            });
    }

}
