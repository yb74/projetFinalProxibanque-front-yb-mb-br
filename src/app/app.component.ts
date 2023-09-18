import {Component, OnInit} from '@angular/core';
import {FormService} from "./services/form/form.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proxibanque-front-v4-yb-mb-br';
  isConnected = false

  constructor(private formService: FormService) {

  }

  ngOnInit(): void {
    this.formService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isConnected = isLoggedIn;
    });
  }
}
