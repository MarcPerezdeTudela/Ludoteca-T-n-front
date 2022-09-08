import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';
import { LOAN_DATA } from './model/mock-loans';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getLoans(
    pageable: Pageable,
    gameId?: number,
    customerId?: number,
    loanDate?: Date
  ): Observable<LoanPage> {
    const url = this.composeFindUrl(customerId, gameId, loanDate);
    return this.http.post<LoanPage>(url, {
      pageable: pageable,
    });
  }

  getLoan(idLoan: number): Observable<Loan[]> {
    return this.http.get<Loan[]>(`http://localhost:8080/loan/${idLoan}`);
  }

  saveLoan(loan: Loan): Observable<Loan> {
    let url = 'http://localhost:8080/loan';

    if (loan.id != null) {
      url += '/' + loan.id;
    }
    return this.http.put<Loan>(url, loan);
  }

  deleteLoan(idLoan: number): Observable<Loan> {
    return this.http.delete<Loan>(`http://localhost:8080/loan/${idLoan}`);
  }

  private composeFindUrl(
    customerId?: number,
    gameId?: number,
    loanDate?: Date
  ): string {
    let params = '';
    let searchDate = '';

    if (customerId != null) {
      params += 'customer_id=' + customerId;
    }

    if (gameId != null) {
      if (params != '') params += '&';
      params += 'game_id=' + gameId;
    }

    if (loanDate != null) {
      if (params != '') params += '&';
      searchDate = new Date(loanDate).toLocaleDateString();

      params += 'loan_date=' + searchDate;
    }

    let url = 'http://localhost:8080/loan';

    if (params == '') return url;
    else return url + '?' + params;
  }
}
