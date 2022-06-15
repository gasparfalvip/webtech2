import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

interface IOptions {
	value: string;
	viewValue: string;
}

@Component({
	selector: "app-rentable-search",
	templateUrl: "./rentable-search.component.html",
	styleUrls: ["./rentable-search.component.css"],
})
export class RentableSearchComponent implements OnInit {
	submitted = false;

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
			title: ["", [Validators.required, Validators.pattern("^[A-Z].+$")]],
		});
	}

	submitForm() {
		this.submitted = true;
		if (!this.createForm.valid) {
			return false;
		} else {
			this.apiService.createRentable(this.createForm.value).subscribe(
				(res) => {
					console.log("Rentable successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}

//TODO: This is a dialog! Put it in the dialog folder and refactor.
