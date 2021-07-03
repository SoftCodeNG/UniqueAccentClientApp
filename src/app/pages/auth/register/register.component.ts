import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Select} from '@ngxs/store';
import {AppState} from '../../../store/app-store/app.state';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormData: FormGroup;
  showPassword = false;
  isLoading = false;

  @Select(AppState.getIsNetworkRequestOngoing) isLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerFormData = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  registerUser(): void {
    if (this.registerFormData.valid) {
      this.isLoading = true;
      this.authService.register(this.registerFormData.value).subscribe(res => {
        this.isLoading = false;
        if (res.email) {
          this.toastr.error('Email address already registered');
        } else {
          this.toastr.success('Registration Successful');
        }
      });
    }
  }
}
