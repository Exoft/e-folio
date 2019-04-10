import { Component } from '@angular/core';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
    constructor() { }

    readAccesToken(): boolean{
      const token = localStorage.getItem('accessToken');
      if (token) {
        return false;
      } else { return true; }
    }
}
