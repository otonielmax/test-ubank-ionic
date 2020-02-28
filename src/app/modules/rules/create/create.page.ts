import { Goal } from './../../../models/goal';
import { TeamsPage } from './../../goal/modal/teams/teams.page';
import { Rules } from './../../../models/rules';
import { EventType } from './../../../enums/event-type.enum';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  listEventType = Object.values(EventType);  
  
  rule: Rules;
  goal: Goal;
  isEdit: boolean = false;    

  constructor(    
    public modalController: ModalController,
    public toastController: ToastController,
    public alertController: AlertController,
    private storage: Storage,
    private route: ActivatedRoute, 
    private router: Router
    ) {     
    this.rule = new Rules(1, null, null, null, null, null, null);

    this.route.queryParams.subscribe(params => {
      if (params && params.goal) {
        this.goal = JSON.parse(params.goal);
        this.rule.idGoal = this.goal.id;
        console.log(this.goal);
      }

      if (params && params.rule) {
        this.rule = JSON.parse(params.rule);        
        this.isEdit = true;
      }
      else {        
        this.storage.get('rules').then((val) => {       
          let id = val ? val.length + 1 : 1;         
          this.rule.id = id;
        }); 
        this.isEdit = false;
      }        
    });    
  }

  ngOnInit() {        
    
  }

  validate() {
    if (this.rule && !this.rule.idFootballTeam) {
      this.presentToast('Debes seleccionar un equipo para la regla');
      return;
    }
    if (this.rule && !this.rule.eventType) {
      this.presentToast('Debes seleccionar un tipo de evento');
      return;
    }
    if (this.rule && !this.rule.amount || this.rule.amount < 1) {
      this.presentToast('Debes ingresar el monto y este debe ser mayor de 0');
      return;
    }
    this.save();
  }

  save() {
    this.goal.rules.push(this.rule);

    this.storage.get('rules')
    .then((val) => {      
      let list = val ? val : [];  
      const r = this.rule;
      list.push(r);  
      this.storage.set('rules', list);
    });    

    this.storage.get('goals')
    .then((val) => {      
      let index = val.findIndex((item) => { return item.id === this.goal.id; });
      val[index] = this.goal;      
      this.storage.set('goals', val);
    });    

    if (this.goal.rules.length < 5 && !this.isEdit) {
      this.presentAlertConfirm();
    }
    else {        
      this.router.navigate(['goals']);
    }
  }

  restablecer() {
    this.rule.id = this.rule.id + 1;
    this.rule.amount = null;
    this.rule.idFootballTeam = null;
    this.rule.eventType = null;    
    this.rule.nameTeam = null;
    this.rule.imgTeam = null;
  }

  validateIfExistTeamInRules() {
    let index = this.goal.rules.findIndex((item) => { 
      return item.idFootballTeam === this.rule.idFootballTeam && item.eventType === this.rule.eventType; 
    });
    if (index !== -1) {
      console.log(this.goal.rules, this.rule);
      this.presentToast('No puedes crear una regla con los mismo valores que otra relacionada a esta meta');
      this.rule.idFootballTeam = null;
      this.rule.nameTeam = null;
      this.rule.eventType = null;
      this.rule.imgTeam = null;
    }
  }

  updateRulesList() {
    this.storage.get('rules')
    .then((val) => {    
      let newList = [];
      val.forEach((item) => {
        if (item.idGoal === this.goal.id) {
          newList.push(item);
        }
      })
      this.goal.rules = newList;
      this.restablecer();
    });    
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: TeamsPage
    });
    modal.present();
    const { data } = await modal.onWillDismiss();  
    if (data.item) {
      this.rule.idFootballTeam = data.item.id;
      this.rule.nameTeam = data.item.name;     
      this.rule.imgTeam = data.item.crestUrl;
      this.validateIfExistTeamInRules(); 
    }
    return null;
  }  

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Deseas agregar otra regla a tu meta',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {            
            this.router.navigate(['goals']);
          }
        }, {
          text: 'Si',
          handler: () => {
            this.updateRulesList();
          }
        }
      ]
    });

    await alert.present();
  }

}
