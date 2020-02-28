import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'goals',
    pathMatch: 'full'
  },
  {
    path: 'goals',
    loadChildren: () => import('./modules/goal/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'goals/create',
    loadChildren: () => import('./modules/goal/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'goals/edit',
    loadChildren: () => import('./modules/goal/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'goals/details',
    loadChildren: () => import('./modules/goals/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./modules/goal/modal/teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'rules/create',
    loadChildren: () => import('./modules/rules/create/create.module').then( m => m.CreatePageModule)
  },  
  {
    path: 'rules/simulate',
    loadChildren: () => import('./modules/rules/simulate/simulate.module').then( m => m.SimulatePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
