import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/service/api.service';
import { FormErrorMatcherService } from 'src/app/service/form-error-matcher.service';

@Component({
  selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  createForm: FormGroup;
  

	matcher = new FormErrorMatcherService();
  constructor(
    private router: Router,
		private formBuilder: FormBuilder,
		private apiService: ApiService) {
      this.mainForm();
     }

  ngOnInit(): void {
  }

  mainForm() {
		this.createForm = this.formBuilder.group({
			username: ["", [Validators.required]],
			password: ["", [Validators.required]],
		});
	}

  submitForm() {
    if (!this.createForm.valid) {
			return false;
		} else {
      /*this.apiService.createUser(this.createForm.value).subscribe((data) => {
        console.log("created u");
      })*/
      this.apiService.getUser(this.createForm.value.username).subscribe((userdata) => {
        console.log(userdata);
        console.log(this.createForm.value);
        if(userdata.password === this.createForm.value.password){
          this.router.navigate(['/clients']);
        }else{
          alert("Wrong username or password!!!44!!");
        }
      })
		}
	}

}
