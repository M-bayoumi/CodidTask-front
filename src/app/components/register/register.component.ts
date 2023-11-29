import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/models/iresponse';
import { IUser } from 'src/app/models/iuser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  response: IResponse = {} as IResponse;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userRegisterForm = fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{3,}')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{3,}')],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9]{3,}'),
          ],
        ],
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
        confirmPassword: ['', [Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{11}')],
        ],
      },

      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
  }

  submit() {
    let userRegister: IUser = this.userRegisterForm.value;

    this.userService.Register(userRegister).subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.router.navigate(['/login']);
      },
      error: (e) => {
        console.log(e.error)
      },
      complete: () => console.log('complete'),
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }
  
  get firstName() {
    return this.userRegisterForm.get('firstName');
  }
  get lastName() {
    return this.userRegisterForm.get('lastName');
  }
  get userName() {
    return this.userRegisterForm.get('userName');
  }
  get email() {
    return this.userRegisterForm.get('email');
  }
  get phoneNumber() {
    return this.userRegisterForm.get('phoneNumber');
  }

  get password() {
    return this.userRegisterForm.get('password');
  }

  get confirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }
}
