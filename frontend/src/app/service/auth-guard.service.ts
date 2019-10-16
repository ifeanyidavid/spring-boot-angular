import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/src/utils/preactivation";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(
    private router: Router,
    private authServie: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authServie.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
