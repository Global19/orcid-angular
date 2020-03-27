import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { ErrorHandlerService } from '../error-handler/error-handler.service'
import { environment } from '../../../environments/environment.local'
import { catchError, retry } from 'rxjs/operators'
import { SignIn } from '../../types/sign-in.endpoint'

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlerService
  ) {}

  signIn(data) {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    let body = new HttpParams()
    body = body.set('userId', data.username)
    body = body.set('password', data.password)
    if (data.verificationCode) {
      body = body.set('verificationCode', data.verificationCode)
    }
    if (data.recoveryCode) {
      body = body.set('recoveryCode', data.recoveryCode)
    }
    body = body.set('oauthRequest', 'false')
    return this._http
      .post<SignIn>(environment.API_WEB + `signin/auth.json`, body, {
        headers,
        withCredentials: true,
      })
      .pipe(
        retry(3),
        catchError(this._errorHandler.handleError)
      )
  }

  reactivation(data) {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    let body = new HttpParams()
    body = body.set('email', data.email)
    return this._http
      .post<any>(environment.API_WEB + `sendReactivation.json`, body, {
        headers,
        withCredentials: true,
      })
      .pipe(
        retry(3),
        catchError(this._errorHandler.handleError)
      )
  }

  resendClaim(data) {
    return this._http
      .get<any>(
        environment.API_WEB +
          `resend-claim?email=` +
          encodeURIComponent(data.username),
        {
          withCredentials: true,
        }
      )
      .pipe(
        retry(3),
        catchError(this._errorHandler.handleError)
      )
  }
}
