import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProjectsService } from '../../../services/projects-service/projects.service';

import { Phase } from './Phase';
import { Task } from './tasks/Task';

@Component({
  selector: 'phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.css']
})

export class PhasesComponent implements OnInit {
  @Input() phase: Phase;
  @Input () dragOperation: boolean = true;
  phaseTasks: Task[];

  @Output() dragOperationChange = new EventEmitter();

  disableDrag(): void {
    this.dragOperation = false;
    this.dragOperationChange.emit(this.dragOperation);
  }

  enableDrag(): void {
    this.dragOperation = true;
    this.dragOperationChange.emit(this.dragOperation);
  }

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getTasks(this.phase.id).then((result: any) => {
      this.phaseTasks = result.task_info;
    });
  }

  editPhaseName(phaseId: number, newName: string): void {
    this.projectsService.editPhaseName(phaseId, newName);
  }

  deletePhase(phaseId: number): void {
    if (confirm('Are you sure you want to delete this phase?')) {
      this.projectsService.deletePhase(phaseId, this.phaseTasks);
    }
  }

  addNewTask(phaseId: number): void {
    this.projectsService.createTask(phaseId)
      .then((task) => {
        this.phaseTasks.push(task);
      });
  }

  addUserToTask(userId: number, taskId: number): void {
    this.projectsService.assignToTask(userId, taskId, this.projectsService.currentProject.team_id);
  }

  removeUserFromTask(userId: number, taskId: number): void {
    this.projectsService.removeUserFromTask(userId, taskId);
  }

  deleteTask(taskId: number, task: Task): void {
    this.projectsService.deleteTask(taskId, task);
    this.phaseTasks.splice(this.phaseTasks.findIndex(task => task.id === taskId), 1);
  }

  toggleTaskComplete(taskId: number, task: Task) {
    this.projectsService.updateTaskStatus(taskId, !task.complete);
    this.phaseTasks.find(task => task.id === taskId).complete = !task.complete;
  }

  handleError(): void {
    alert("50 Character Limit Exceeded");
  }
}
