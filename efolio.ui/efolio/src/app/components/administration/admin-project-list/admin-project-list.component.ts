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
  public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
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
    this.projectService.GetAll()
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

  deleteElement(id: number) {
    console.log(id);
    this.projectService.DeleteProject(id).subscribe(() =>
      this.loginValidatorBar.open('Project was deleted.', 'Ok', {
        duration: 5000,
        panelClass: ['snackBar'],
      })
    );
    this.getData();
  }

  openEditDialog(project: Project): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      data: { name: project.name, internalDescription: project.internalDescription }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let editProject = project;
        editProject.name = result.name;
        editProject.internalDescription = result.internalDescription;
        this.projectService.UpdateProject(editProject).subscribe(() =>
          this.loginValidatorBar.open('Project was updated.', 'Ok', {
            duration: 5000,
            panelClass: ['snackBar'],
          })
        );
      }
      console.log(result);
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: { name: '', internalDescription: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let project = new Project(0, result.name, result.internalDescription , '', '');
        this.projectService.AddProject(project).subscribe(() =>
          this.loginValidatorBar.open('Project was added.', 'Ok', {
            duration: 5000,
            panelClass: ['snackBar'],
          })
        );
      }
      console.log(result);
    });
  }
}
