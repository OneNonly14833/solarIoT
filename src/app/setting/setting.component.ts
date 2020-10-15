import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../app/authentication.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(private authC: AuthenticationService) { }

  logout(): void{
    this.authC.logout();
  }

  ngOnInit(): void {
  }

}
