import { Component,OnInit } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
  })
  export class SpinnerComponent implements OnInit {
    public isLoading: boolean = false;
  
    constructor(private spinnerService: SpinnerService) { }
  
    ngOnInit(): void {
      this.spinnerService.isLoading$.subscribe(loadingState => {
        this.isLoading = loadingState;
      })
    }
}