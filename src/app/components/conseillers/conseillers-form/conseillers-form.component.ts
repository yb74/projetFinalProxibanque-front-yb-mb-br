import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-conseillers-form',
  templateUrl: './conseillers-form.component.html',
  styleUrls: ['./conseillers-form.component.css']
})
export class ConseillersFormComponent {
  @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<FormData>();
  public isFormVisible: boolean = false;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.isFormVisible$.subscribe(visibility => {
      this.isFormVisible = visibility;
    })
  }

  shouldShowErrorStyle(): boolean {
    return this.form.invalid;
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.formSubmit.emit(formData);
    }
  }

  closeForm() {
    this.formService.updateFormVisibility(false);
  }
}
