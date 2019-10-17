import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username, password) {
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });
    return this.httpClient
      .get<User>("http://localhost:8080/employees/validateLogin", { headers })
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          const authString = "Basic " + btoa(username + ":" + password);
          sessionStorage.setItem("basicauth", authString);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem("username");
    // console.log(!(user === null));
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem("username");
  }
}
