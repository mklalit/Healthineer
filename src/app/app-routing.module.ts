import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationComponent } from './pages/consultation/consultation.component';
import { PhysicianComponent } from './pages/physician/physician.component';

const routes: Routes = [
  {
    path: '', title: 'Consultation', component: ConsultationComponent,
  },
  {
    path: 'physician', title: 'Physician', component: PhysicianComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
