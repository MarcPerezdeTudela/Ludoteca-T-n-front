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

  getLoans(pageable: Pageable): Observable<LoanPage> {
    return this.http.post<LoanPage>('http://localhost:8080/loan', {
      pageable: pageable,
    });
  }

  getLoan(
    game?: number,
    client?: number,
    loan_date?: Date
  ): Observable<Loan[]> {
    return this.http.get<Loan[]>(
      `http://localhost:8080/loan?game=${game}&client=${client}&loan_date=${loan_date}`
    );
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
}
