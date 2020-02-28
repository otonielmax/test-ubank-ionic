import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Goal } from './../../../models/goal';

@Component({
  selector: 'app-simulate',
  templateUrl: './simulate.page.html',
  styleUrls: ['./simulate.page.scss'],
})
export class SimulatePage implements OnInit {  

  listTeamIds: any[] = [];
  goal: Goal;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute, 
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.goal) {
        this.goal = JSON.parse(params.goal);        
      }      

      this.getIdTeamsByRules();
    });  
  }

  ngOnInit() {
  }

  getIdTeamsByRules() {
    this.goal.rules.forEach((item) => {
      if (this.listTeamIds.findIndex((item2) => { return item.idFootballTeam === item2.id; }) === -1) {
        this.listTeamIds.push({
          id: item.idFootballTeam,
          play: {
            total: 0,
            history: []
          },
          winner: {
            total: 0,
            history: []
          },
          gol: {
            total: 0,
            history: []
          }
        });
      }
    });

    this.loadScore();
  }

  loadScore() {
    this.listTeamIds.forEach((item, index) => {
      this.getScoreByTeam(item.id, index);
    });
  }

  getScoreByTeam(id: number, index: number) {
    let filters: HttpParams = new HttpParams();    
    filters.append('season', '2019');
    this.api.get(
      'teams/'.concat(id.toString()).concat('/matches?season=2019&competitions=2001'),  
      filters    
    )
    .then(response => {     
      response.matches.forEach((item) => {
        let config = {
          type: item.homeTeam.id === id ? 'AWAY_TEAM' : 'HOME_TEAM',
          key: item.homeTeam.id === id ? 'awayTeam' : 'homeTeam',
          rival: item.homeTeam.id === id ? item.awayTeam.name : item.homeTeam.name,
          date: item.utcDate.split('T')[0]
        };
        // Play
        this.listTeamIds[index].play.total += 1;
        this.listTeamIds[index].play.history.push({
          quantity: 1,
          msg: 'ahorrado por jugar contra ' + config.rival + ' el dia ' + config.date         
        });
        // Winner
        if (config.type === item.score.winner) {
          this.listTeamIds[index].winner.total += 1;
          this.listTeamIds[index].winner.history.push({
            quantity: 1,
            msg: 'ahorrado por ganar contra ' + config.rival + ' el dia ' + config.date 
          });
        }   
        // Gol
        let quantityGol = 
          item.score.fullTime[config.key] + item.score.halfTime[config.key] +
          (item.score.extraTime[config.key] ? item.score.extraTime[config.key] : 0) + 
          (item.score.penalties[config.key] ? item.score.penalties[config.key] : 0);
        this.listTeamIds[index].gol.total += quantityGol;
        this.listTeamIds[index].gol.history.push({
          quantity: quantityGol,
          msg: 'por anotar ' + quantityGol + ' gol contra ' + config.rival + ' el dia ' + config.date         
        });          
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  edit(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        goal: JSON.stringify(this.goal),
        rule: JSON.stringify(item)
      }
    };
    this.router.navigate(['rules/edit'], navigationExtras);
  }

}
