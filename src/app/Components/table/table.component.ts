import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, DoCheck } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../deletemodal/deletemodal.component';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, DoCheck {

  displayedColumns: string[] = ['TaskName', 'Student', 'Date', 'Action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() isadded: Boolean = false
  @Input() taskList: any

  constructor(
    public dialog: MatDialog
    , private cd: ChangeDetectorRef
    , private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.GetTasks();

  }

  ngDoCheck() {
    if (this.sharedService.isadded) this.GetTasks()
    this.sharedService.isadded = false

  }
  taskslength: number = 0
  GetTasks() {
    let tasks = this.sharedService.getTasks()
    this.taskslength = tasks.length
    this.dataSource = new MatTableDataSource(tasks);
    this.dataSource.paginator = this.paginator;

    this.cd.markForCheck();

  }
  EditTask(element: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      height: 'auto',
      data: { element: element, mode: "Edit" },
    }).afterClosed().subscribe((val: any) => {
      if (val == 'save') {
        this.GetTasks()
      }
    })
  }

  CheckDeleteTask(element: any) {
    this.dialog.open(DeleteDialogComponent, {
      width: '20%',
      data: element,
    }).afterClosed().subscribe((val: any) => {
      if (val == 'delete') {
        this.GetTasks();
      }
    })
  }

}



