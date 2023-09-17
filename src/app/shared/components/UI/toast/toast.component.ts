<<<<<<< HEAD
import { Component,OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
=======
import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../../../services/toast/toast.service";
>>>>>>> 2d3f364cdbfd29338c277683433845b1a4bd60c4

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})

export class ToastComponent implements OnInit {
  public toastMessage: string = ''; // Initialize with an empty string
  public isToastVisible: boolean = false;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastMessage$.subscribe(message => {
      this.toastMessage = message;
    });

    // Add logic to display and auto-hide the toast here
    this.toastService.isToastVisible$.subscribe(visibility => {
      this.isToastVisible = visibility;
    })
  }

  closeToast() {
    this.toastService.updateToastVisibility(false)
  }
}
