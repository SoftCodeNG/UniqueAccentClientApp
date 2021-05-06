import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {SetRefreshToken, SetToken} from '../../../store/app-store/app.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loginFormData = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  loginUser(): void {
    if (this.loginFormData.valid) {
      this.authService.login(this.loginFormData.value).subscribe(res => {
        console.log('Login Successful');
        this.store.dispatch(new SetToken(res.access));
        this.store.dispatch(new SetRefreshToken(res.refresh));
      });
    }
  }
}
