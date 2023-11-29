import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILogin } from 'src/app/models/ilogin';
import { IResponse } from 'src/app/models/iresponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  response: IResponse = {} as IResponse;
  returnUrl: string = '';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.userLoginForm = fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
      rememberMe: [false],
      role: ['User'],
    });
  }

  ngOnInit(): void {}

  submit() {
    let userLogin: ILogin = this.userLoginForm.value;
    this.userService.Login(userLogin).subscribe({
      next: (v) => {
        this.response = v as IResponse;
        let userToken = this.response.data.token;
        localStorage.setItem('token', userToken);
        console.log( this.response)
        this.router.navigate(['/home']);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.log('complete'),
    });
  }

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }
}
