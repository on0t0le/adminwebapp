import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  id: number;
  amount: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  /*
  {id: 1, name: 'Hydrogen', amount: 10},
  {id: 2, name: 'Helium', amount: 120},
  {id: 3, name: 'Lithium', amount: 50},
  {id: 4, name: 'Beryllium', amount: 150 },
  {id: 5, name: 'Boron', amount: 80},
  {id: 6, name: 'Carbon', amount: 1},
  {id: 7, name: 'Nitrogen', amount: 15},
  {id: 8, name: 'Oxygen', amount: 9},
  {id: 9, name: 'Fluorine', amount: 56},
  {id: 10, name: 'Neon', amount: 47}
  */
  { id: 1, name: 'Hydrogen', amount: '192.168.1.10' },
  { id: 2, name: 'Helium', amount: '192.168.1.20' },
  { id: 3, name: 'Lithium', amount: '192.168.1.80' },
  { id: 4, name: 'Beryllium', amount: '192.168.1.40' },
  { id: 5, name: 'Boron', amount: '192.168.1.100' },
  { id: 6, name: 'Carbon', amount: '192.168.1.60' },
  { id: 7, name: 'Nitrogen', amount: '192.168.1.70' },
  { id: 8, name: 'Oxygen', amount: '192.168.1.30' },
  { id: 9, name: 'Fluorine', amount: '192.168.1.90' },
  { id: 10, name: 'Neon', amount: '192.168.1.50' }

];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'amount': return ipCompare(a.amount, b.amount, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

/** Simple IP comparator */
function ipCompare(a, b, isAsc){
  a = a.split('.');
  b = b.split('.');
  var result;

  for (var i in a){
    a[i] = parseInt(a[i],10);
    b[i] = parseInt(b[i],10);
    if(a[i]<b[i]){
      result = -1;
    } else if (a[i]>b[i]){
      result = 1;
    }
  }

  return result * (isAsc ? 1 : -1);
}
