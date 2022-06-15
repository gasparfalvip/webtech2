import { Element, identifierModuleUrl } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ApiService } from "src/app/service/api.service";
import { RentCreateComponent } from "../rent-create/rent-create.component";



@Component({
	selector: "app-rent-list",
	templateUrl: "./rent-list.component.html",
	styleUrls: ["./rent-list.component.css"],
})
export class RentListComponent implements OnInit {
	Rents: any = [];
	Rentables: any = [];
	Clients: any = [];
	availableCount: number = 0;
	Today: Date = new Date();
	RentablesLate: any = [];
	constructor(
		private apiService: ApiService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar
	) {
		this.readRents();
		this.readAvailables();
		this.readClients();
	}

	
	ngOnInit(): void {
		this.apiService.getClients().subscribe((data) => {
		this.Clients = data;
		});
		}

	readAvailables() {
		this.apiService.getRentables().subscribe((data) => {
			this.Rentables = data;
		});

		this.Rentables.forEach((rentable) => {
			if (rentable.state == "AVAILABLE") {
				this.availableCount++;
			}
		});
		console.log(this.Rentables);
	}

	setToday(){
		this.Today=new Date();
		console.log(this.Today.getDate());
	}

	readClients() {
		this.apiService.getClients().subscribe((data) => {
			this.Clients = data;
		});
	}

	readRents() {
		this.apiService.getRents().subscribe((data) => {
			this.Rents = data;
		});
	}

	readRentables(){
		this.apiService.getRentables().subscribe((data) => {
			this.Rentables = data;
		});
	}

	createRent() {
		this.readClients();
		this.readAvailables();
		if (this.availableCount > 0) {
			const dialogRef = this.dialog.open(RentCreateComponent);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.readRents();
				}
			});
		} else {
			const config = new MatSnackBarConfig();
			config.duration = 1000;
			config.panelClass = ["warn-snackbar"];
			this.snackBar.open(
				"There is nothing to rent!",
				this.availableCount.toString(),
				config
			);
		}
	}
	
	removediv(){
		const element = document.getElementById("overdue");
		element.remove();
	}

	getLateRents(){
		this.RentablesLate.splice(0,this.RentablesLate.length)
		this.Rents.forEach((rent) => {
			var date = new Date(rent.expiry);
			var date2 = this.Today;
			console.log(date);
			console.log(date2);
			if(date2>date){
				this.RentablesLate.push(rent);
			}
			console.log(this.RentablesLate);
		});
	}

	replaceClient(client, rent){
		let rentToDelete;
		console.log(client.Rents);
		//client.Rents.splice()
		/*client.Rents.forEach((clientrent) => {
			
		});*/
		client.Rents=client.Rents.filter(clientrent => clientrent._id !==rent._id);
		console.log(client.Rents);
		this.apiService.deleteClient(client._id).subscribe((data) => {
			this.Clients.splice(client, 1);
			this.apiService.createClient(client).subscribe(client);
		});;
	}

	updateRentable(rentable){
		console.log(rentable);
		rentable.state = "AVAILABE";
		this.apiService.updateRentable(rentable._id, rentable).subscribe();
	}

	deleteRent(rent, index){
		this.readClients();
		this.readRentables();

		this.Clients.forEach((client) => {
			client.Rents.forEach((clientrent) => {
				if(clientrent._id===rent._id){
					
					this.replaceClient(client, clientrent);
				}
			});

		});

		rent.Rented.forEach((rente) => {
			this.Rentables.forEach((rentable) => {
				if(rentable._id===rente._id){
					console.log(rentable);
					this.updateRentable(rentable)
				}
			});
		});

		this.apiService
			.deleteRent(rent._id)
			.subscribe((data) => {
				this.Rents.splice(rent, 1);
			});

	}

	

}
