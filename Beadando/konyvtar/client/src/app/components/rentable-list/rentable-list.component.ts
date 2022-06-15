import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeleteRentableComponent } from "src/app/dialog/delete-rentable/delete-rentable.component";
import { EditRentableComponent } from "src/app/dialog/edit-rentable/edit-rentable.component";
import { ApiService } from "src/app/service/api.service";
import { RentableAddComponent } from "../rentable-add/rentable-add.component";
import { RentableSearchComponent } from "../search-rentable/rentable-search.component";

@Component({
	selector: "app-rentable-list",
	templateUrl: "./rentable-list.component.html",
	styleUrls: ["./rentable-list.component.css"],
})
export class RentableListComponent implements OnInit {
	Rentables: any = [];
	RentablesFiltered: any = [];
	imgClass;

	constructor(private apiService: ApiService, public dialog: MatDialog) {
		this.readRentables();
	}

	ngOnInit(): void {
		this.apiService.getRentables().subscribe((data) => {
			this.RentablesFiltered = data;
		});
	}

	readRentables() {
		this.apiService.getRentables().subscribe((data) => {
			this.Rentables = data;
		});
	}

	readRentablesFiltered() {
		this.apiService.getRentables().subscribe((data) => {
			this.RentablesFiltered = data;
		});
	}

	removeRentable(rentable, index) {
		const dialogRef = this.dialog.open(DeleteRentableComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.apiService
					.deleteRentable(rentable._id)
					.subscribe((data) => {
						console.log(rentable);
						console.log(index);
						this.readRentablesFiltered();
						this.readRentables();
					});
				
			}
		});
	}

	editRentable(rentable, index) {
		const dialogRef = this.dialog.open(EditRentableComponent, {
			data: { myobj: rentable, index: index },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readRentables();
				this.readRentablesFiltered();
			}
		});
	}

	createRentable() {
		const dialogRef = this.dialog.open(RentableAddComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readRentables();
				this.readRentablesFiltered();
			}
		});
	}

	searchRentable(event) {
		console.log(event.target.value);
		this.RentablesFiltered=this.Rentables.filter(_rentable => _rentable.title.includes(event.target.value));
		console.log(this.RentablesFiltered);
	}
}
