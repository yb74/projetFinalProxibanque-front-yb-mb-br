import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    mail: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  login(conseillerForm: FormGroup) {

  }
}
