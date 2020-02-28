import { Goal } from './../../../models/goal';
import { GoalType } from './../../../enums/goal-type.enum';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  listGoalType = Object.values(GoalType);  

  dateNow = new Date();
  dateMin: string;
  goal: Goal;
  isEdit: boolean = false;

  constructor(    
    public modalController: ModalController,
    public toastController: ToastController,
    private storage: Storage,
    private route: ActivatedRoute, 
    private router: Router
    ) { 
    this.dateNow.setDate(this.dateNow.getDate() + 30);
    this.dateMin = this.dateNow.toISOString().split('T')[0];       
    this.goal = new Goal(1, null, null, null);

    this.route.queryParams.subscribe(params => {
      if (params && params.goal) {
        this.goal = JSON.parse(params.goal);        
        this.isEdit = true;
      }
      else {        
        this.storage.get('goals').then((val) => {       
          let id = val ? val.length + 1 : 1;         
          this.goal.id = id;
        }); 
        this.isEdit = false;
      }        
    });    
  }

  ngOnInit() {        
    
  }

  validate() {
    if (this.goal && !this.goal.goalType) {
      this.presentToast('Debes seleccionar un tipo de meta');
      return;
    }
    if (this.goal && !this.goal.goalDate) {
      this.presentToast('Debes seleccionar la fecha de la meta');
      return;
    }
    if (this.goal && !this.goal.amount || this.goal.amount < 1) {
      this.presentToast('Debes ingresar el monto y este debe ser mayor de 0');
      return;
    }
    this.save();
  }

  save() {
    this.storage.get('goals')
    .then((val) => {      
      let list = val ? val : [];  
      list.push(this.goal);  
      this.storage.set('goals', list);
    }); 
        
    if (this.isEdit) {
      this.router.navigate(['goals']);
    }
    else {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          goal: JSON.stringify(this.goal)
        }
      };  
      this.router.navigate(['rules/create'], navigationExtras);
    }    
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
