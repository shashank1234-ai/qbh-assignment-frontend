import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import jsPDF from 'jspdf';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule,PdfViewerModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: User[] = [];

  constructor(private userService: UserService) {}
  pdfSrc:any=null
  // src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  ngOnInit(): void {
    this.loadUsers();
  }
  viewpdf:boolean=false
  loadUsers(): void {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
number(id:any){
  return Number(id)
}
 async generatePDF() {
    let doc = new jsPDF()
    let y=10
   this.userService.getUsers().subscribe((res:any)=>{
    console.log(res)
    for(let i=0;i<res.length;i++){
      doc.text(`Name: ${res[i].name}`, 10, y);
      doc.text(`Email: ${res[i].email}`, 10, y + 10);
      doc.text(`Contact: ${res[i].contact}`, 10, y + 20);
      doc.text(`Address: ${res[i].address}`, 10, y + 30);    
      if (i < res.length - 1) {
        doc.line(10, y + 40, 200, y + 40);
        y += 50;
      }
    }
    const pdfBlob = doc.output('blob');
    console.log(pdfBlob)
          const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
 
   })

  }
}
