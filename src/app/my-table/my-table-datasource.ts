import { DataSource } from '@angular/cdk/table';
import { Observable, of as observableOf} from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { UsersService } from '../services/users.service';
import { User } from '../models/User';


const DummyData: User[] = [
    { id: 1, username: 'onotole', email: 'onotole@mail.com', company:{name: 'llc_onotole'}},
    { id: 2, username: 'serj', email: 'serj@mail.com', company:{name: 'llc_serj'}},
    { id: 3, username: 'john', email: 'john@mail.com', company:{name: 'llc_john'}}
];


export class MyTableDatasource extends DataSource<User>{

    data: User[] = DummyData;
    
    ngOnInit(){        
    }

    constructor(private paginator: MatPaginator, private sort: MatSort) {
        super();
    }

    connect(): Observable<User[]> {
        return observableOf(this.data);
        
    }
    disconnect() { }
    
}
