import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './../../../../services/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage {

  listTeam: any[] = [];

  constructor(
    private api: ApiService,
    public modalController: ModalController
    ) { 
    this.getTeams();
  }

  getTeams() {
    let filters: HttpParams = new HttpParams();    
    filters.append('season', '2019');
    this.listTeam = [];
    this.api.get(
      'competitions/2001/teams?season=2019',  
      filters    
    )
    .then(response => {      
      this.listTeam = response.teams;
      console.log(this.listTeam);
    })
    .catch(error => {
      console.error(error);
    });
  }

  onDismiss(item) {
    this.modalController.dismiss({
      'item': item
    });
  }

}
