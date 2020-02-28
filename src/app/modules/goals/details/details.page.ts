import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Goal } from './../../../models/goal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  goal: Goal;

  constructor(
    private storage: Storage,
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.goal) {
        this.goal = JSON.parse(params.goal);        
      }      
    });  
  }

  ngOnInit() {
  }

  simulate() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        goal: JSON.stringify(this.goal)
      }
    };
    this.router.navigate(['rules/simulate'], navigationExtras);
  }

  add() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        goal: JSON.stringify(this.goal)
      }
    };
    this.router.navigate(['rules/create'], navigationExtras);
  }

  edit() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        goal: JSON.stringify(this.goal)
      }
    };
    this.router.navigate(['goals/edit'], navigationExtras);
  }

}
