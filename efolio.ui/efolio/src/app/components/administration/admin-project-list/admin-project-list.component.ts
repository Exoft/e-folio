import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from '../dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'app-admin-project-list',
  templateUrl: './admin-project-list.component.html',
  styleUrls: ['./admin-project-list.component.scss']
})
export class AdminProjectListComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'InDesc', 'ExDesc', 'actions'];
  public dataSource = new MatTableDataSource();
  public projects: Project[] = [];

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private loaderService: LoaderService,
    private loginValidatorBar: MatSnackBar) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loaderService.startLoading();
    this.projects = [];
    this.projectService.getAll()
      .subscribe(responce => {
        responce.forEach(element => {
          this.projects.push(new Project(element.id,
            element.name,
            element.internalDescription,
            element.externalDescription,
            element.photoBase64));
        });
        this.dataSource.data = this.projects;
        this.loaderService.stopLoading();
      },
        (error) => console.log(error)
      );
  }

  deleteElement(id: number, index: number) {
    this.projectService.deleteProject(id).subscribe(() =>
      this.loginValidatorBar.open('Project was deleted.', 'Ok', {
        duration: 5000,
        panelClass: ['snackBar'],
      })
    );
    this.projects.splice(index, 1);
    this.dataSource.data = this.projects;
  }

  openEditDialog(project: Project): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      data: {
        name: project.name,
        internalDescription: project.internalDescription,
        externalDescription: project.externalDescription
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.checkResult(result)) {
        const editProject = new Project(
          project.id,
          result.name,
          result.internalDescription,
          result.externalDescription,
          project.photoBase64
        );
        this.projectService.updateProject(editProject).subscribe(() => {
          this.loginValidatorBar.open('Project was updated.', 'Ok', {
            duration: 5000,
            panelClass: ['snackBar'],
          });
          this.getData();
        }, (err) => {
          this.loginValidatorBar.open('Server error.', 'Ok', {
            duration: 8000,
            panelClass: ['snackBar'],
          });
          this.loaderService.stopLoading();
        });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: { name: '', internalDescription: '', externalDescription: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.checkResult(result)) {
        const project = new Project(0, result.name, result.internalDescription, result.externalDescription, '');
        this.projectService.addProject(project).subscribe(() => {
          this.loginValidatorBar.open('Project was added.', 'Ok', {
            duration: 5000,
            panelClass: ['snackBar'],
          });
          this.getData();
        }, (err) => {
          this.loginValidatorBar.open('Server error.', 'Ok', {
            duration: 8000,
            panelClass: ['snackBar'],
          });
          this.loaderService.stopLoading();
        });
      }
    });
  }

  private checkResult(result): boolean {
    if (result === undefined)
      return false;

    if (result.name.trim() == '' &&
      result.internalDescription.trim() == '' &&
      result.externalDescription.trim() == '')
      return false;

    return true;
  }
}
