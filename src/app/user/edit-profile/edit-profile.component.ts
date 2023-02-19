import { Component, OnInit } from '@angular/core';
import { UserDataModel } from 'src/app/model/user-data.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userDataModel: UserDataModel = new UserDataModel();
  constructor() { }

  async ngOnInit() {
    this.userDataModel = JSON.parse(AuthService.GetLocalStorage("user"));
  }

}
