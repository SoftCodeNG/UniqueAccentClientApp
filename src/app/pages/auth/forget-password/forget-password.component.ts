import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm = new FormGroup({});
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  requestPasswordChange(): void {
    if (this.forgetPasswordForm.valid) {
      this.authenticationService.requestPasswordChange(this.forgetPasswordForm.value).subscribe(res => {
        if (res.payload?.success) {
          this.toastr.success('A password reset link was sent to your email', 'Success');
        } else if (res.payload?.resetLink) {
          this.toastr.error(res.description, 'Error');
          this.errorMessage = res.description;
        } else {
          this.toastr.error(res.description, 'Error');
          this.errorMessage = res.description;
        }
      });
    }
  }
}
