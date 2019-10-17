import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BasicAuthHttpInterceptService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      sessionStorage.getItem("username") &&
      sessionStorage.getItem("basicauth")
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem("basicauth")
        }
      });
    }
    return next.handle(req);
  }

  constructor() {}
}
