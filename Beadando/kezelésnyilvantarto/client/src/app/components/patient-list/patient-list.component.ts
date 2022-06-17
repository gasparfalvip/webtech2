import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { PatientCreateComponent } from "../patient-create/patient-create.component";
import { PatientEditComponent } from "../patient-edit/patient-edit.component";

@Component({
	selector: "app-patient-list",
	templateUrl: "./patient-list.component.html",
	styleUrls: ["./patient-list.component.css"],
})
export class PatientListComponent implements OnInit {
	Patients: any = [];
	panelOpenState = false;
	constructor(private apiService: ApiService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.readPatients();
	}

	readPatients() {
		this.apiService.getPatients().subscribe((data) => {
			this.Patients = data;
			console.log(this.Patients);
		});
	}

	createPatient() {
		const dialogRef = this.dialog.open(PatientCreateComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readPatients();
				console.log(this.Patients);
			}
		});
	}

	togglePatient(patient) {
		patient.isDeleted = !patient.isDeleted;
		this.apiService.updatePatient(patient._id, patient).subscribe(
			(res) => {
				console.log(res + "Patient deleted successfully!");
			},
			(error) => {
				console.log(error);
			}
		);
	}
	editPatient(patient) {
		const dialogRef = this.dialog.open(PatientEditComponent, {
			data: { myobj: patient, index: patient._id },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readPatients();
			}
		});
	}
}
