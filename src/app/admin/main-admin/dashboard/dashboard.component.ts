import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { MatDateRangePicker, MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  SearchParams: any = {
    Batdau: moment().startOf('day').add(-7, "days").toDate(),
    Ketthuc: moment().endOf('day').toDate(),
    pageSize: 9999,
    pageNumber: 0
  };
  basicData: any;
  basicOptions: any;
  Thongkes: any[] = [
    { id: 1, Title: 'Danh Mục', Icon: 'folder', Value: '11', Percent: '11%' },
    { id: 2, Title: 'Sản Phẩm', Icon: 'description', Value: '163', Percent: '29%' },
    { id: 3, Title: 'Bài Viết', Icon: 'nutrition', Value: '20', Percent: '45%' },
    { id: 4, Title: 'Liên Hệ', Icon: 'chat', Value: '1385', Percent: '31%' }
  ]
  constructor() { }
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Tổng Đơn Hàng',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
  ChanggeData() {
    
  }
}
