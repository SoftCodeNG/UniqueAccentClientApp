import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {Select, Store} from '@ngxs/store';
import {AppState} from '../../../store/app-store/app.state';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SetRefreshToken, SetToken, SetUserCourses, SetUserProfile} from '../../../store/app-store/app.action';
import {CourseService} from '../../../core/services/course.service';

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
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private coursesService: CourseService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.registerFormData = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
    this.initGoogle();
  }

  registerUser(): void {
    if (this.registerFormData.valid) {
      this.isLoading = true;
      this.authenticationService.register(this.registerFormData.value).subscribe(res => {
        this.isLoading = false;
        if (res.name) {
          this.toastr.success('Registration Successful');
          this.loginUser({email: res.email, password: this.registerFormData.value.password});
        } else {
          this.toastr.error('Email address already registered');
        }
      });
    }
  }

  loginUser(data: any): void {
    this.authenticationService.login(data).subscribe(res => {
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
                token: googleUser.mc.access_token,
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
