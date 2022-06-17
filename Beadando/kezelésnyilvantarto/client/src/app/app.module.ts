import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import {
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
} from "@angular/material/core";
import {
	MatDialogModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PatientCreateComponent } from "./components/patient-create/patient-create.component";
import { PatientEditComponent } from "./components/patient-edit/patient-edit.component";
import { PatientListComponent } from "./components/patient-list/patient-list.component";
import { TreatmentCreateComponent } from "./components/treatment-create/treatment-create.component";
import { TreatmentListComponent } from "./components/treatment-list/treatment-list.component";
import { ProcedureAddComponent } from "./components/procedure-add/procedure-add.component";
import { ProcedureListComponent } from "./components/procedure-list/procedure-list.component";
import { DeleteProcedureComponent } from "./dialog/delete-procedure/delete-procedure.component";
import { EditProcedureComponent } from "./dialog/edit-procedure/edit-procedure.component";
import { MaterialModule } from "./material.module";
import { ApiService } from "./service/api.service";

@NgModule({
	declarations: [
		AppComponent,
		PatientListComponent,
		PatientCreateComponent,
		PatientEditComponent,
		ProcedureAddComponent,
		ProcedureListComponent,
		TreatmentCreateComponent,
		TreatmentListComponent,
		DeleteProcedureComponent,
		EditProcedureComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		LayoutModule,
		MaterialModule,
		ReactiveFormsModule,
		MatDialogModule,
		FlexLayoutModule,
	],
	providers: [
		ApiService,
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true },
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
