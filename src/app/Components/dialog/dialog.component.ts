import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/Services/shared.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  taskform !: FormGroup
  constructor(
    private formbuilder: FormBuilder
    , @Inject(MAT_DIALOG_DATA) public editdata: any
    , private toastr: ToastrService
    , private dialogref: MatDialogRef<DialogComponent>
    , private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.taskform = this.formbuilder.group({
      taskname: ['', Validators.required],
      student: ['', Validators.required],
      date: ['', Validators.required]
    })

    if (this.editdata.element) {
      this.taskform.controls['taskname'].setValue(this.editdata.element.taskname)
      this.taskform.controls['student'].setValue(this.editdata.element.student)
      this.taskform.controls['date'].setValue(this.editdata.element.date)
    }
    this.allTasksCount = this.sharedService.getTasks().length
  }

  allTasksCount: number = 0
  StudentList = [
    { name: 'Ahmed' },
    { name: 'Asmaa' },
    { name: 'Ali' },
    { name: 'Nada' },
    { name: 'Mohamed' },
    { name: 'Mona' },
  ]
  newId: number = 0;
  SaveTask() {

    if (this.taskform.valid) {
      //add
      if (this.editdata.mode == "Add") {
        let obj = this.taskform.value
        this.newId = Number(new Date())
        this.sharedService.addtoTaskList({ ...obj, id: this.newId })
        this.sharedService.isadded = true
        this.taskform.reset();
        this.dialogref.close('save')
      }
      // edit
      else if (this.editdata.mode == "Edit") {
        let obj = this.taskform.value
        this.sharedService.editTask(this.editdata.element.id, obj)
        this.taskform.reset();
        this.dialogref.close('save')
      }

    }
    else {
      this.toastr.error("All Fields are required")
    }
  }


}
