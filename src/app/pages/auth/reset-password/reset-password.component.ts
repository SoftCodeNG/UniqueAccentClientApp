import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rest-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  showPassword = false;
  resetPasswordForm = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      token: [this.activatedRoute.snapshot.params.token, Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    });
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid && (this.resetPasswordForm.value.password === this.resetPasswordForm.value.confirmPassword)) {
      this.authenticationService.resetPassword(this.resetPasswordForm.value).subscribe(res => {
        this.toastr.success(res.description, 'Success');
        this.router.navigate(['/auth/login']).then();
      });
    }
  }

}
