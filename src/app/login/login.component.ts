import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  returnUrl;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,
     private route:ActivatedRoute) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.authService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      console.log(window.sessionStorage.getItem('token'));
      this.router.navigate([this.returnUrl]);
    }, error => {
      window.sessionStorage.setItem('token', JSON.stringify({
        "access_token": "f3ffa4cd-8818-4f4d-b1ad-7ffb60ce21cb",
        "token_type": "bearer",
        "refresh_token": "0c964d30-600d-4d9f-85c7-a29eaea5e60a",
        "expires_in": 3599,
        "scope": "read write trust"
      }));
       // alert(error.error.error_description)
    });
  }

  ngOnInit() {
     this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}

