import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeleteProcedureComponent } from "src/app/dialog/delete-procedure/delete-procedure.component";
import { EditProcedureComponent } from "src/app/dialog/edit-procedure/edit-procedure.component";
import { ApiService } from "src/app/service/api.service";
import { ProcedureAddComponent } from "../procedure-add/procedure-add.component";

@Component({
	selector: "app-procedure-list",
	templateUrl: "./procedure-list.component.html",
	styleUrls: ["./procedure-list.component.css"],
})
export class ProcedureListComponent implements OnInit {
	Procedures: any = [];
	ProceduresFiltered: any = [];
	imgClass;

	constructor(private apiService: ApiService, public dialog: MatDialog) {
		this.readProcedures();
	}

	ngOnInit(): void {
		this.apiService.getProcedures().subscribe((data) => {
			this.ProceduresFiltered = data;
		});
	}

	readProcedures() {
		this.apiService.getProcedures().subscribe((data) => {
			this.Procedures = data;
		});
	}

	readProceduresFiltered() {
		this.apiService.getProcedures().subscribe((data) => {
			this.ProceduresFiltered = data;
		});
	}

	removeProcedure(procedure, index) {
		const dialogRef = this.dialog.open(DeleteProcedureComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.apiService
					.deleteProcedure(procedure._id)
					.subscribe((data) => {
						console.log(procedure);
						console.log(index);
						this.readProceduresFiltered();
						this.readProcedures();
					});
				
			}
		});
	}

	editProcedure(procedure, index) {
		const dialogRef = this.dialog.open(EditProcedureComponent, {
			data: { myobj: procedure, index: index },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readProcedures();
				this.readProceduresFiltered();
			}
		});
	}

	createProcedure() {
		const dialogRef = this.dialog.open(ProcedureAddComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readProcedures();
				this.readProceduresFiltered();
			}
		});
	}

	searchProcedure(event) {
		console.log(event.target.value);
		this.ProceduresFiltered=this.Procedures.filter(_procedure => _procedure.title.includes(event.target.value));
		console.log(this.ProceduresFiltered);
	}
}
