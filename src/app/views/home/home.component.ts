import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { MatDialog } from '@angular/material/dialog';






export interface PeriodicElement {
  name: string;
  identifier: number;
  number: number;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {identifier: 1, name: 'Placa da video', number: 13123213123123123, description: 'Placa De Vídeo Asus Radeon RX 580 8GB'},
  {identifier: 1, name: 'Placa da video', number: 13123213123123123, description: 'Placa de Vídeo Gigabyte - GeForce RTX 3050, 8GB GDDR6'},
  {identifier: 3, name: 'SSD', number: 13123213123123123, description: 'WD Green™ PC SN350 NVMe™ SSD 480GB'},
  {identifier: 2, name: 'MEMORIA RAM', number: 13123213123123123, description: 'CORSAIR Memória de desktop VENGEANCE RGB PRO 32GB'},
  {identifier: 1, name: 'Placa da video', number: 13123213123123123, description: 'PLACA DE VIDEO ASUS GEFORCE GTX 1650 TUF GAMING OC EDITION 4GB GDDR6 TUF-GTX1650-O4GD6-P-GAMING'},
  
  
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable) //pegar um id filho 
  table!: MatTable<any>
  displayedColumns: string[] = ['identifier', 'name', 'number', 'description', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        identifier: null,
        name: '',
        number: null,
        description: ''
      } : {
        // id: element.id,
        identifier: element.identifier,
        name: element.name,
        number: element.number,
        description: element.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.dataSource.map(p => p.identifier).includes(result.identifier)) {
          this.dataSource[result.identifier - 1] = result;
          this.table.renderRows();
        }else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }

  deleteElement(position: number): void {
    this.dataSource = this.dataSource.filter(p => p.identifier !== position);
  }

}
