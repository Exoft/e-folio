import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { AdministrationService } from 'src/app/services/administration.service';
import { Developer } from 'src/app/models/developer.model';
import { LoaderService } from 'src/app/services/loader.service';
import { AddDeveloperDialogComponent } from './dialogs/add-dialog/add-developer-dialog.component';
import { EditDeveloperDialogComponent } from './dialogs/edit-dialog/edit-developer-dialog.component';
import { EditDeveloperData } from '../../../models/edit-developer-data.model';

@Component({
  selector: 'app-admin-developers-list',
  templateUrl: './admin-developers-list.component.html',
  styleUrls: ['./admin-developers-list.component.scss']
})
export class AdminDevelopersListComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'fullName', 'internalCV', 'externalCV', 'actions'];
  public dataSource = new MatTableDataSource();
  public developers: Developer[] = [];

  constructor(
    private administrationService: AdministrationService,
    public dialog: MatDialog,
    private vaidatorBar: MatSnackBar,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loaderService.startLoading();
    this.developers = [];
    this.administrationService.getAllDevelopers()
      .subscribe(responce => {

        responce.forEach(element => {
          this.developers.push(new Developer(
            element.id,
            element.fullName,
            element.internalCV,
            element.externalCV,
            element.photoBase64));
        });
        this.dataSource.data = this.developers;
        this.loaderService.stopLoading();
      });
  }

  addDeveloper(developer: Developer) {
    // this.loaderService.startLoading();
    const dialogRef = this.dialog.open(AddDeveloperDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.stopLoading();
        this.vaidatorBar.open('Developer was added', 'Ok', {
          duration: 5000,
          panelClass: ['snackBar']
        });
        this.developers.push(result);
        this.dataSource.data = this.developers;
      }
    });
  }

  deleteDeveloper(index: number) {
    this.loaderService.startLoading();
    const id = this.developers[index].id;
    this.administrationService.deleteOneDeveloper(id).subscribe(() => {
      this.loaderService.stopLoading();
      this.vaidatorBar.open('Developer was deleted', 'Ok', {
        duration: 5000,
        panelClass: ['snackBar']
      });
      this.developers.splice(index, 1);
      this.dataSource.data = this.developers;
    });
  }

  editDeveloper(developer: Developer) {
    const dialogRef = this.dialog.open(EditDeveloperDialogComponent, {
      data: new EditDeveloperData(developer, null)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const editDeveloper = new Developer(
          result.developer.id,
          result.developer.fullName,
          result.developer.internalCV,
          result.developer.externalCV,
          null
        );
        this.loaderService.stopLoading();
        this.administrationService.editDeveloper(editDeveloper, result.imageData)
          .subscribe(
            resp => {
              this.vaidatorBar.open('Developer was updated.', 'Ok', {
                duration: 5000,
                panelClass: ['snackBar'],
              });
              this.getData();
            },
            error => {
              this.vaidatorBar.open(error.message, 'Ok', {
                duration: 5000,
                panelClass: ['error-snackbar'],
              });
          });
      }
    });
  }
}
