import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-patient-create",
	templateUrl: "./patient-create.component.html",
	styleUrls: ["./patient-create.component.css"],
})
export class PatientCreateComponent implements OnInit {
	createForm: FormGroup;

	matcher = new FormErrorMatcherService();

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
			phoneNum: [
				"",
				[Validators.required, Validators.pattern("^[0-9]+$")],
			],
			TAJnum: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			address: this.formBuilder.group({
				city: [
					"",
					[Validators.required, Validators.pattern("^[A-Z].+$")],
				],
				street: [
					"",
					[Validators.required, Validators.pattern("^[A-Z].+$")],
				],
				house: [
					"",
					[Validators.required, Validators.pattern("^[0-9]+$")],
				],
			}),
		});
	}

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			console.log(
				"PatientCreateComponent -> this.createForm.value",
				this.createForm.value
			);
			this.apiService.createPatient(this.createForm.value).subscribe(
				() => {
					console.log("Patient successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}

//TODO: This is a dialog! Put it in the dialog folder and refactor.
