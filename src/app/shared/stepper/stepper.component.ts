import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  imports: [
    MatStepperModule,
    FormsModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
  steps: any[] = [
    {
      label: 'Giỏ Hàng',
      type: 'input',
      placeholder: 'Enter your name',
      value: '',
      required: true,
    },
    {
      label: 'Giao hàng',
      type: 'input',
      placeholder: 'Enter your name',
      value: '',
      required: true,
    },
    {
      label: 'Thanh Toán',
      type: 'input',
      placeholder: 'Enter your name',
      value: '',
      required: true,
    },
    {
      label: 'Xác Nhận',
      type: 'input',
      placeholder: 'Enter your address',
      value: '',
      required: true,
    },
    {
      label: 'Hoàn Tất',
      type: 'input',
      placeholder: 'Enter your address',
      value: '',
      required: true,
    },
  ];

  completeStepper() {
    console.log('Stepper completed!', this.steps);
  }
}
