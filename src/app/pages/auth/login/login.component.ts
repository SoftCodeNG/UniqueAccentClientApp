import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication.service';
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
    private authenticationService: AuthenticationService,
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
    this.initGoogle();
  }

  loginUser(): void {
    if (this.loginFormData.valid) {
      this.authenticationService.login(this.loginFormData.value).subscribe(res => {
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

  loginWithGoogleButton(): void {
    const button  = document.getElementById('google-signin-btn') as HTMLButtonElement;
    button.click();
  }

  loginWithGoogle(data: any): void {
    this.authenticationService.loginWithGoogle(data).subscribe(res => {
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

  initGoogle(): void {
      setTimeout(() => {
        // @ts-ignore
        const Gapi = gapi;
        Gapi.load('auth2', () => {
          const element = document.getElementById('google-signin-btn');
          Gapi.auth2.init({
              client_id: '541468338282-57tph5v1ksr34adsjmms1s9gbl28e8iq.apps.googleusercontent.com', // this is the button "id"
          }).attachClickHandler(element, {}, () => {
            console.log('Sing in successful');
            Gapi.signin2.render('google-signin-btn', {
            onsuccess: (googleUser) => {
              const profile = googleUser.getBasicProfile();
              // console.log('Full Name: ' + profile.getName());
              // console.log('Email: ' + profile.getEmail());
              // console.log('Email: ', googleUser.getAuthResponse());
              // console.log('Email: ', googleUser.mc.access_token);
              this.loginWithGoogle({
                token: googleUser.Zb.access_token,
                name: profile.getName(),
              });
            }
          });
          }, () => {
            console.log('Sing in Failed');
          });
          console.log(Gapi);
        });
      }, 500);
    }
}
