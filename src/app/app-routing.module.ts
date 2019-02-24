import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { UsersTableComponent } from './users-table/users-table.component';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UsersTableComponent},
  {path: 'datatable', component: DataTableComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

