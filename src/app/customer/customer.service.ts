import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './model/Customer';
import { CUSTOMER_DATA } from './model/mock-customers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`http://localhost:8080/customer`);
  }

  getCustomer(idCustomer: number): Observable<Customer> {
    return this.http.get<Customer>(
      `http://localhost:8080/customer/${idCustomer}`
    );
  }
  saveCustomer(customer: Customer): Observable<Customer> {
    let url = `http://localhost:8080/customer`;
    if (customer.id != null) url += `/${customer.id}`;

    return this.http.put<Customer>(url, customer);
  }

  deleteCustomer(idCustomer: number): Observable<Customer> {
    return this.http.delete<Customer>(
      `http://localhost:8080/customer/${idCustomer}`
    );
  }
}
