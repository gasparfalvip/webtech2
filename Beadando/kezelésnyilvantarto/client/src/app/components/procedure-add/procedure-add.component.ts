import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

interface IOptions {
	value: string;
	viewValue: string;
}

@Component({
	selector: "app-procedure-add",
	templateUrl: "./procedure-add.component.html",
	styleUrls: ["./procedure-add.component.css"],
})
export class ProcedureAddComponent implements OnInit {
	submitted = false;

	createForm: FormGroup;

	matcher = new FormErrorMatcherService();

	states: IOptions[] = [
		{ value: "AVAILABLE", viewValue: "Available" },
		{ value: "OCCUPIED", viewValue: "Occupied" },
		{ value: "OUTDATED", viewValue: "Outdated" },
	];

	types: IOptions[] = [
		{ value: "SURGERY", viewValue: "Surgery" },
		{ value: "CHEMOTHERAPY", viewValue: "Chemotherapy" },
		{ value: "RADIATION THERAPY", viewValue: "Radiation Therapy" },
		{ value: "OTHER", viewValue: "Other" },
	];

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService
	) {
		this.mainForm();
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {}

	mainForm() {
		this.createForm = this.formBuilder.group({
			name: ["", [Validators.required, Validators.pattern("^[A-Z].+$")]],
			serNum: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			state: ["", [Validators.required]],
			type: ["", [Validators.required]],
		});
	}

	submitForm() {
		this.submitted = true;
		if (!this.createForm.valid) {
			return false;
		} else {
			this.apiService.createProcedure(this.createForm.value).subscribe(
				(res) => {
					console.log("Procedure successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}

