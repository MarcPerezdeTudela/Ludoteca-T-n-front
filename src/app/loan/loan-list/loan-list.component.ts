import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { CustomerService } from 'src/app/customer/customer.service';
import { Customer } from 'src/app/customer/model/Customer';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss'],
})
export class LoanListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  customers: Customer[];
  games: Game[];
  filterCustomer: Customer;
  filterGame: Game;
  filterDate: Date;
  dataSource = new MatTableDataSource<Loan>();

  displayedColumns: string[] = [
    'id',
    'game',
    'customer',
    'loanDate',
    'returnDate',
    'action',
  ];

  constructor(
    private loanService: LoanService,
    private customerService: CustomerService,
    private gameService: GameService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPage();

    this.customerService
      .getCustomers()
      .subscribe((customers) => (this.customers = customers));

    this.gameService.getGames().subscribe((games) => (this.games = games));
  }

  loadPage(event?: PageEvent) {
    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    const customerIdToFilter = this.filterCustomer
      ? this.filterCustomer.id
      : null;
    const gameIdToFilter = this.filterGame ? this.filterGame.id : null;
    const dateToFilter = this.filterDate ? this.filterDate : null;

    this.loanService
      .getLoans(pageable, gameIdToFilter, customerIdToFilter, dateToFilter)
      .subscribe((data) => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      });
  }

  onCleanFilter() {
    this.filterCustomer = null;
    this.filterGame = null;
    this.filterDate = null;

    this.loadPage();
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    this.loanService.deleteLoan(loan.id).subscribe((result) => {
      this.loadPage();
    });
  }
}
