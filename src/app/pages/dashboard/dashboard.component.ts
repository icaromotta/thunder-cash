import { Observable } from 'rxjs';
import { CashbackInterface } from './../../interfaces/cashback-interface';
import { CashbackService } from './../../services/cashback.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public salesForm: FormGroup
  public searchForm: FormGroup
  public cashbacks$: Observable<CashbackInterface[]>
  public searchText: string

  constructor(private formBuilder: FormBuilder,
              private cashbackService: CashbackService) { }

  ngOnInit() {

    this.salesForm = this.formBuilder.group({
      userId: [localStorage.getItem('userId'), Validators.required],
      saleCode: ['', Validators.required],
      saleValue: ['', Validators.required],
      saleDate: ['', [Validators.required, Validators.email]]
    })

    this.listAllCashbacks()
  }

  listAllCashbacks() {

    this.cashbackService.allCashback(localStorage.getItem('userId'))
      .subscribe((result) => {
        this.cashbacks$ = result.cashback
      })
  }

  onSubmit() {
    
    this.cashbackService.addCashback(this.salesForm.value)
      .subscribe((cashback: any) => {

        this.listAllCashbacks()

        if(cashback.ok === true) {
          Swal.fire(
            'Muito bom!',
            'Seu reembolso foi adicionado.',
            'success'
          )
        }
      })
  }
}
