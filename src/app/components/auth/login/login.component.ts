import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((access: any) => {

      // TODO: chenge strategy to token conference
      if(access.ok === false) {
        Swal.fire(
          'Acesso negado',
          access.error,
          'error'
        )
        return false
      }
    
      // localStorage.setItem('token', access.token)
      // localStorage.setItem('userId', access.userId)
      this.router.navigateByUrl('/');
      this.loginForm.reset();

    }, (err) => {
      Swal.fire(
        'Acesso negado',
        'Verifique suas credenciais!',
        'error'
      )
    })
  }

}
