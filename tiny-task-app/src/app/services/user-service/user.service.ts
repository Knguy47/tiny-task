import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Team } from '../../teams/Team';
import { User } from '../../projects/project-details/project-user/User';

// Import ReactiveJS Observables
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/JSON'});
  private baseUrl: string = 'http://localhost:8080';

  public userId: string = 'test';
  // public userProfile: any;
  public projectIds: number[] = [1, 2, 3];
  public teams: Team[];
  public currentTeam: Team = {id: 1, teamName: 'Tiny Task'}; // MOCK DATA
  // public usersOnProject: User[];
  // public usersOnTeam: User[]; Same as usersOnProject at the moment

  // MOCK DATA
  public usersOnProject: User[] = [
    {
      id: 1,
      full_name: 'Kevin',
      email: 'kev_lose@gmail.com',
      user_availability: 'Available',
      user_status: 'Not working hard'
    },
    {
      id: 2,
      full_name: 'David',
      email: 'iLoveSL@gmail.com',
      user_availability: 'Available',
      user_status: 'Very Sick'
    }
  ]

  public userProfile: any = {
    full_name: 'Beth Stevic',
    email: 'beth.s@tinytask.com'
  }

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  getUserInfo(token: string): Promise<object> {
    return this.http.get(`${this.baseUrl}/api/users/${token}`)
            .toPromise()
            .then( (response) => {
              this.userProfile = response.json();
              // this.projectIds =
              // this.teams =
              console.log(response.json())
              return response.json() as object;
            })
            .catch(this.handleError);
  }

  getUsersOnProject(projectId: number): void {
    // this.http.get(`${this.baseUrl}/api/projects/${projectId}/users`)
    //   .toPromise()
    //   .then( (response) => {
    //     this.usersOnProject = response.json();
    //   })
    //   .catch(this.handleError);
  }


  // MOCK DATA
  public testUser: User = {
                            id: 3,
                            full_name: 'Brian',
                            email: 'king@gmail.com',
                            user_availability: 'Available',
                            user_status: 'Working too hard'
                          }

  addUserToProject(projectId: number, userId: string): void {
    this.usersOnProject.push(this.testUser);
    // this.http.post(
    //   `${this.baseUrl}/api/projects/${projectId}/users`,
    //   JSON.stringify({projectId: projectId, userId: userId}))
    //   .toPromise()
    //   .then( (response) => {
    //     this.usersOnProject.push(response.json());
    //   })
    //   .catch(this.handleError);
  }
}
