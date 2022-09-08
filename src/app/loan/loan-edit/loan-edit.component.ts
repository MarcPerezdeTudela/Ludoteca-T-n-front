import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/customer/customer.service';
import { Customer } from 'src/app/customer/model/Customer';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss'],
})
export class LoanEditComponent implements OnInit {
  games: Game[];
  customers: Customer[];
  loan: Loan;
  game: Game;
  customer: Customer;

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    private gameService: GameService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.loan = new Loan();
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  onSave() {
    this.loanService.saveLoan(this.loan).subscribe((result) => {
      this.dialogRef.close();
    });
  }
}
