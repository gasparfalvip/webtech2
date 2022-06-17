import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

//? Separate services for different route types??

@Injectable({
	providedIn: "root",
})
export class ApiService {
	baseUri = "http://localhost:3003/serv";

	headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(private http: HttpClient) {}

	// Create PR
	createProcedure(data: any): Observable<any> {
		const url = `${this.baseUri}/addPR`;
		return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}

	// Create T
	createTreatment(data: any): Observable<any> {
		const url = `${this.baseUri}/addT`;
		return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}

	// Create P
	createPatient(data: any): Observable<any> {
		const url = `${this.baseUri}/addP`;
		return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}


	// Get all PR
	getProcedures() {
		return this.http.get(`${this.baseUri}/getallPR`);
	}

	// Get all T
	getTreatments() {
		return this.http.get(`${this.baseUri}/getallT`);
	}

	// Get all P
	getPatients() {
		return this.http.get(`${this.baseUri}/getallP`);
	}

	// Get U
	getUser(id: any): Observable<any> {
		const url = `${this.baseUri}/getU/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	// Get PR by ID
	getProcedure(id: any): Observable<any> {
		const url = `${this.baseUri}/getPR/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	// Get R by ID
	getTreatment(id: any): Observable<any> {
		const url = `${this.baseUri}/getT/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	// Get R by ID
	getPatient(id: any): Observable<any> {
		const url = `${this.baseUri}/getP/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	// Update PR
	updateProcedure(id: any, data: any): Observable<any> {
		const url = `${this.baseUri}/updatePR/${id}`;
		return this.http
			.put(url, data, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	// Update R
	updateTreatment(id: any, data: any): Observable<any> {
		const url = `${this.baseUri}/updateT/${id}`;
		return this.http
			.put(url, data, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	// Update P
	updatePatient(id: any, data: any): Observable<any> {
		const url = `${this.baseUri}/updateP/${id}`;
		return this.http
			.put(url, data, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	// Pull P
	updatepullPatient(id: any, data: any): Observable<any> {
		const url = `${this.baseUri}/updateP/${id}/${id}`;
		return this.http
			.put(url, data, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	// Delete PR
	deleteProcedure(id: any): Observable<any> {
		const url = `${this.baseUri}/deletePR/${id}`;
		return this.http
			.delete(url, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	// Delete T
	deleteTreatment(id: any): Observable<any> {
		const url = `${this.baseUri}/deleteT/${id}`;
		return this.http
			.delete(url, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	// Delete C
	deletePatient(id: any): Observable<any> {
		const url = `${this.baseUri}/deleteP/${id}`;
		return this.http
			.delete(url, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	// Error handling
	errorMgmt(error: HttpErrorResponse) {
		let errorMessage = "";
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log("ApiService errorMessage: ", errorMessage);
		return throwError(errorMessage);
	}
}
