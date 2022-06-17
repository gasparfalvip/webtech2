import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-treatment-create",
	templateUrl: "./treatment-create.component.html",
	styleUrls: ["./treatment-create.component.css"],
})
export class TreatmentCreateComponent implements OnInit {
	createForm: FormGroup;
	Procedures: any = [];
	addedProcedures: any = [];
	Patients: any = [];
	selected: any;

	//! tmp
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;

	matcher = new FormErrorMatcherService();



	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService
	) {
		this.mainForm();
		this.readProcedures();
		this.readPatients();
	}

	get myForm() {
		return this.createForm.controls;
	}

	get firstGroup() {
		return this.firstFormGroup.controls;
	}

	//! tmp oninit
	ngOnInit(): void {
		this.firstFormGroup = this.formBuilder.group({
			treatedpatient: ["", Validators.required],
		});
		this.secondFormGroup = this.formBuilder.group({
			secondCtrl: ["", Validators.required],
		});
		this.readPatients();
	}

	readProcedures() {
		this.apiService.getProcedures().subscribe((data) => {
			this.Procedures = data;
		});
	}

	readPatients() {
		this.apiService.getPatients().subscribe((data) => {
			this.Patients = data;
		});
		console.log(this.Patients);
	}

	mainForm() {
		this.createForm = this.formBuilder.group({
			startdate: ["", [Validators.required]],
			enddate: ["", [Validators.required]],
			Procedures: [""],
		});
	}

	addProcedure(procedure, i) {
		this.Procedures.splice(i, 1);
		this.addedProcedures.push(procedure);
		this.createForm.value.Procedures = this.addedProcedures;
	}

	removeProcedure(procedure, i) {
		this.addedProcedures.splice(i, 1);
		this.Procedures.push(procedure);
		this.createForm.value.Procedures = this.addedProcedures;
	}

	submitForm() {
		if (!this.createForm.valid && this.addedProcedures.length <= 0) {
			return false;
		} else {
			this.apiService.createTreatment(this.createForm.value).subscribe(
				(res) => {
					this.addedProcedures.forEach((procedure) => {
						procedure.state = "OCCUPIED";
						console.log(
							"TreatmentCreateComponent -> submitForm -> procedure",
							procedure
						);
						this.apiService
							.updateProcedure(procedure._id, procedure)
							.subscribe(
								() => {
									console.log("Updated!");
								},
								(error) => {
									console.log(error);
								}
							);
					});

					this.selected.Treatments.push(res);
					this.apiService
						.updatePatient(this.selected._id, this.selected)
						.subscribe(() => {
							console.log("Patient updated!");
						});
					console.log("Treatment successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}

