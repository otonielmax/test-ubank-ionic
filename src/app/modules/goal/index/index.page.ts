import { Goal } from './../../../models/goal';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  listGoals: Goal[] = [];

  constructor(
    private storage: Storage,
    private router: Router
  ) {             
  }

  ngOnInit() {
  }  

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.storage.get('goals').then((val) => {       
      let list = val ? val : [];             
      this.listGoals = list;
    }); 
  }

  edit(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        goal: JSON.stringify(item)
      }
    };
    this.router.navigate(['goals/details'], navigationExtras);
  }

}
