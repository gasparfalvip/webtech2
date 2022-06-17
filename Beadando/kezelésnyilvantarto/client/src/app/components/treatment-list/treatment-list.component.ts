import { Element, identifierModuleUrl } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ApiService } from "src/app/service/api.service";
import { TreatmentCreateComponent } from "../treatment-create/treatment-create.component";



@Component({
	selector: "app-treatment-list",
	templateUrl: "./treatment-list.component.html",
	styleUrls: ["./treatment-list.component.css"],
})
export class TreatmentListComponent implements OnInit {
	Treatments: any = [];
	Procedures: any = [];
	Patients: any = [];
	availableCount: number = 0;
	Today: Date = new Date();
	ProceduresLate: any = [];
	constructor(
		private apiService: ApiService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar
	) {
		this.readTreatments();
		this.readAvailables();
		this.readPatients();
	}

	
	ngOnInit(): void {
		this.apiService.getPatients().subscribe((data) => {
		this.Patients = data;
		});
		}

	readAvailables() {
		this.apiService.getProcedures().subscribe((data) => {
			this.Procedures = data;
		});

		this.Procedures.forEach((procedure) => {
			if (procedure.state == "AVAILABLE") {
				this.availableCount++;
			}
		});
		console.log(this.Procedures);
	}

	setToday(){
		this.Today=new Date();
		console.log(this.Today.getDate());
	}

	readPatients() {
		this.apiService.getPatients().subscribe((data) => {
			this.Patients = data;
		});
	}

	readTreatments() {
		this.apiService.getTreatments().subscribe((data) => {
			this.Treatments = data;
		});
	}

	readProcedures(){
		this.apiService.getProcedures().subscribe((data) => {
			this.Procedures = data;
		});
	}

	createTreatment() {
		this.readPatients();
		this.readAvailables();
		if (this.availableCount > 0) {
			const dialogRef = this.dialog.open(TreatmentCreateComponent);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.readTreatments();
				}
			});
		} else {
			const config = new MatSnackBarConfig();
			config.duration = 1000;
			config.panelClass = ["warn-snackbar"];
			this.snackBar.open(
				"There is no procedure available!",
				this.availableCount.toString(),
				config
			);
		}
	}
	
	removediv(){
		const element = document.getElementById("overdue");
		element.remove();
	}

	getLateTreatments(){
		this.ProceduresLate.splice(0,this.ProceduresLate.length)
		this.Treatments.forEach((treatment) => {
			var date = new Date(treatment.enddate);
			var date2 = this.Today;
			console.log(date);
			console.log(date2);
			if(date2>date){
				this.ProceduresLate.push(treatment);
			}
			console.log(this.ProceduresLate);
		});
	}

	replacePatient(patient, treatment){
		let treatmentToDelete;
		console.log(patient.Treatments);
		patient.Treatments=patient.Treatments.filter(patienttreatment => patienttreatment._id !==treatment._id);
		console.log(patient.Treatments);
		this.apiService.deletePatient(patient._id).subscribe((data) => {
			this.Patients.splice(patient, 1);
			this.apiService.createPatient(patient).subscribe(patient);
		});;
	}

	updateProcedure(procedure){
		console.log(procedure);
		procedure.state = "AVAILABLE";
		this.apiService.updateProcedure(procedure._id, procedure).subscribe();
	}

	deleteTreatment(treatment, index){
		this.readPatients();
		this.readProcedures();

		this.Patients.forEach((patient) => {
			patient.Treatments.forEach((patienttreatment) => {
				if(patienttreatment._id===treatment._id){
					
					this.replacePatient(patient, patienttreatment);
				}
			});

		});

		treatment.Procedures.forEach((treatmente) => {
			this.Procedures.forEach((procedure) => {
				if(procedure._id===treatmente._id){
					console.log(procedure);
					this.updateProcedure(procedure)
				}
			});
		});

		this.apiService
			.deleteTreatment(treatment._id)
			.subscribe((data) => {
				this.Treatments.splice(treatment, 1);
			});

	}

	

}
