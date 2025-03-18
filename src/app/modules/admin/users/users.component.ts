import { UowService } from './../../../services/uow.service';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import {  Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { User } from 'app/models/User';
import { RouterModule } from '@angular/router';
import {  FormGroup, FormsModule} from '@angular/forms';
import { MatModule } from 'app/mat.modules';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatModule,
    MatMenuModule,
    MatDividerModule,
    NgApexchartsModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    RouterModule,
    FormsModule,
    MatProgressBarModule,
    CurrencyPipe,
    DatePipe,],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
    @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    private uow = inject(UowService)
    private _unsubscribeAll = new Subject<any>();
    user: User = JSON.parse(localStorage.getItem("user"));
    paginatorEvent = new Subject<PageEvent>();
    list: User[] = [];
    isSearchBarOpened = false;
    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['name', 'email', 'role',"actions"];
    myForm: FormGroup;
    roles: string[] = [];
    nom = '';
    prenom = '';
    email = '';
    choosenRole = '';


    openSearchBar() {
        this.isSearchBarOpened = !this.isSearchBarOpened;
        if (!this.isSearchBarOpened) this.ngOnInit();
    }

    delete(id: number) {
        this.uow.users.delete(id).subscribe((response) => {
            response ? this.ngOnInit() : console.error("Error while deleting");
        });
    }

    choosingRole(id: string) {
        this.choosenRole = id;
    }

    ngOnInit(): void {


        this.uow.users.getAll().subscribe((res:any) => {
            if (res.success) {
                this.data = res.data;
                this.recentTransactionsDataSource.data = this.data.reverse();
                this.recentTransactionsDataSource.paginator = this.paginator;

            }else{
               console.log("erreur lors de recuperation des donnees ")
            }
        });


        this.roles = ['Admin', 'Employee']
    }

    ngAfterViewInit(): void {
        this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    submit() {
        const searchEmail = this.email || '*';
        const searchPrenom = this.prenom || '*';
        const searchNom = this.nom || '*';
        const role = this.choosenRole || '*';


    }

}
