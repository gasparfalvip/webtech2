import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientCreateComponent } from './components/patient-create/patient-create.component';
import { PatientEditComponent } from './components/patient-edit/patient-edit.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { TreatmentCreateComponent } from './components/treatment-create/treatment-create.component';
import { TreatmentListComponent } from './components/treatment-list/treatment-list.component';
import { ProcedureAddComponent } from './components/procedure-add/procedure-add.component';
import { ProcedureListComponent } from './components/procedure-list/procedure-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'patient-list' },
  { path: 'patient-list' , component: PatientListComponent},
  { path: 'patient-create' , component: PatientCreateComponent },
  { path: 'patient-edit/:id', component: PatientEditComponent },
  { path: 'procedure-list', component: ProcedureListComponent },
  { path: 'procedure-add' , component: ProcedureAddComponent },
  { path: 'treatment-create' , component: TreatmentCreateComponent },
  { path: 'treatment-list' , component: TreatmentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
