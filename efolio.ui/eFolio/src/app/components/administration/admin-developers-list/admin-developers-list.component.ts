import { Component, OnInit } from '@angular/core';
import { Developer } from '../../models/developer.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AdministrationService } from 'src/app/services/administration.service';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { DeveloperServiceService } from 'src/app/services/developer-service.service';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-admin-developers-list',
  templateUrl: './admin-developers-list.component.html',
  styleUrls: ['./admin-developers-list.component.scss']
})
export class AdminDevelopersListComponent implements OnInit {
  public developers: Developer[] = [];
  public displayedColumns: string[] = ['id', 'fullName', 'internalCV', 'externalCV', 'actions'];
  public exampleDatabase: AdministrationService | null;
  public dataSource = new MatTableDataSource();

  constructor(private administrationService: AdministrationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.developers = [];
    this.administrationService.getAllDevelopers()
      .subscribe(responce => {
        this.getData(responce);
        this.dataSource.data = this.developers;
      },
        (error) => console.log(error)
      );
  }

  getData(responce) {
    responce.forEach(element => {
      this.developers.push(new Developer(
        element.id,
        element.fullName,
        element.internalCV,
        element.externalCV,
        element.photoBase64));
    });
  }
  addDeveloper(developer: Developer) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { developer: developer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        
      }
    })
  }
}
