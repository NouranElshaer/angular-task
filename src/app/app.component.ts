import { Component, Inject, Input, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TaskList';
  taskList: any = [{
    id: 1,
    taskname: 'Task1',
    student: 'Ahmed',
    date: new Date()
  }]
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

  SwitchMode(IsDarkMode: Boolean) {
    const hostclass = IsDarkMode ? 'theme-dark' : 'theme-ligth'
    this.renderer.setAttribute(this.document.body, 'class', hostclass)
  }
  @Input() isadded: Boolean = false

  TriggerTableDate(isadded: Boolean) {

  }


}
