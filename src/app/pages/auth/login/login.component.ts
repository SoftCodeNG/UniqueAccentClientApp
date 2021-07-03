import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {
  SetIsNetworkRequestOngoing,
  SetRefreshToken,
  SetToken,
  SetUserCourses,
  SetUserProfile
} from '../../../store/app-store/app.action';
import {ToastrService} from 'ngx-toastr';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CourseService} from '../../../core/services/course.service';
import {AppState} from '../../../store/app-store/app.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormData: FormGroup;
  showPassword = false;

  @Select(AppState.getIsNetworkRequestOngoing) isLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private coursesService: CourseService,
    private store: Store,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new SetIsNetworkRequestOngoing(false));
    this.loginFormData = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  loginUser(): void {
    if (this.loginFormData.valid) {
      this.authService.login(this.loginFormData.value).subscribe(res => {
        const jwt = new JwtHelperService();
        const decodedToken = jwt.decodeToken(res.access);
        console.log('Login Successful', decodedToken);
        this.store.dispatch(new SetToken(res.access));
        this.store.dispatch(new SetRefreshToken(res.refresh));
        this.store.dispatch(new SetUserProfile({
          isAdmin: res.isAdmin,
          isStaff: res.isStaff,
          lastLogin: res.lastLogin,
          user: res.user,
          userId: decodedToken.user_id,
          email: decodedToken.email
        }));
        this.getUserCourses(decodedToken.user_id);
        this.toastr.success('Login successful');
      });
    }
  }

  getUserCourses(userId: number): void {
    this.coursesService.getUserCourses(userId).subscribe(res => {
      this.store.dispatch(new SetUserCourses(res));
    });
  }
}
