import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { GiohangService } from '../../../app/admin/main-admin/website/giohang/giohang.service';
@Component({
  selector: 'app-chitietin',
  templateUrl: './chitietin.component.html',
  styleUrls: ['./chitietin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class ChitietinComponent implements OnInit {
  @Input() Donhang: any = {}
  @Input() Tongthucte: any = 0
  @Input() Taikhoan: any = { STK: '0071001404282', TenTK: "Trần Hữu Lãnh", TenNH: "Vietcombank" }
  // @Input() Taikhoan: any = { STK: '194061552', TenTK: "Công ty TNHH Nông Sản Thực Phẩm Trần Gia", TenNH: "Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng (VPBANK)" }
  @Input() isShowAction: boolean = false
  @Input() Type:any='KHACHHANG'
  @ViewChild('exportPDF') exportPDF!: ElementRef;
  @ViewChild('printArea') printArea!: ElementRef;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  route: ActivatedRoute = inject(ActivatedRoute);
  _GiohangService:GiohangService = inject(GiohangService)
  LinkImage:any=''
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    const idSP = this.route.snapshot.params['id'];
    if(idSP)
      {
        this._GiohangService.getAdDonhangByid(idSP)
        this._GiohangService.addonhang$.subscribe((data)=>{
          if(data)
          {    
            console.log(data);     
            this.Donhang=data
          }
        })
      }
    console.log(this.Donhang);
  }
  CloseAll() {
    this.dialog.closeAll()
  }
  GetTimePrint()
  {
    if(this.Donhang.TimePrint && this.Donhang.TimePrint.length>0)
      {
        return this.Donhang.TimePrint[this.Donhang.TimePrint.length-1].value
      }
      else return new Date()
  }
  GetSubTotal(data: any, field: any, field1: any) {    
    return this._GiohangService.getSum(data,field,field1)
  }
  GetSubTotalThucte(data: any, field: any, field1: any) {    
    const items = data.map((v:any)=>(v.Giachon))    
    return this._GiohangService.getSumThucte(items,field,field1)
  }
  GetTotalThucte(donhang:any,giohang:any,soluong:any,gia:any,thue:any)
  {    
    const result = (this.GetSubTotalThucte(giohang, soluong, gia) + Number(donhang.Vanchuyen.Phivanchuyen||0) + Number(donhang.Giamgia||0) + this.GetSubTotal(giohang, thue, ''))
    return result
  }

  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {

      }
    });
  }  
  public convetToPDF() {
    const A5WidthInPixels = 559;
    const A5HeightInPixels = 794;
    const element = this.exportPDF.nativeElement as HTMLElement;
    html2canvas(element, {
      scale: 4, // Adjust scale for higher DPI if needed (optional)
    }).then(canvas => {
      // Convert canvas to image (data URL)
      const imgData = canvas.toDataURL("image/png");
      // Create PDF using a library like jsPDF
      const pdf = new jspdf({
        orientation: 'portrait',
        unit: 'px',
        format: [A5WidthInPixels, A5HeightInPixels],
      });
      pdf.addImage(imgData, 'PNG',-2, -2,A5WidthInPixels,A5HeightInPixels);
      pdf.save(`${this.Donhang.MaDonHang}_${(new Date()).getTime()}.pdf`);// Adjust filename as needed
    });
    // html2canvas(element).then(canvas => {
    //   console.log(canvas);
    //   // var imgWidth = 480;
    //   // var pageHeight = 750;
    //   // var imgHeight = imgWidth / canvas.width;
    //   // var heightLeft = imgHeight;
    //   const contentDataURL = canvas.toDataURL('image/png')
    //   this.LinkImage = canvas.toDataURL('image/png')
    //   this.dialog.open(this.dialogTemplate);
    //   let pdf = new jspdf('p', 'mm', 'a5'); // A4 size page of PDF
    //   var position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, canvas.width, canvas.height)       
    //   pdf.save(`${this.Donhang.MaDonHang}_${(new Date()).getTime()}.pdf`); // Generated PDF
    // }); 
  }
  printDiv() {
    const printArea = this.printArea.nativeElement;
    console.log(printArea);
    const originalStyles = printArea.style.display;
    printArea.style.display = 'flex'; // Ensure visibility for printing
    printArea.style.margin = '0'; // Remove margins for full-page coverage
    printArea.style.padding = '0'; // Remove padding for full-page coverage
    window.print();
    printArea.style.display = originalStyles; // Restore original styles
  }

}
