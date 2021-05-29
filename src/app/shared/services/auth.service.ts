import {Inject, Injectable} from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {BroadcastService, MsalService} from '@azure/msal-angular';
import {Subject, Subscription} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { isIE, b2cPolicies } from '../../app-config';
import {CryptoUtils, Logger} from 'msal';

const defaultPath = '/home';
const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

@Injectable()
export class AuthService {
  apiResponse: string;
  isIframe = false;
  loggedIn = false;
  subscriptions: Subscription[] = [];

  constructor(private msalService: MsalService, private httpClient: HttpClient, private broadcastService: BroadcastService) {
    let loginSuccessSubscription: Subscription;
    let loginFailureSubscription: Subscription;
    let accessTokenSuccessSubscription: Subscription;
    let accessTokenFailureSubscription: Subscription;

    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();

    // event listeners for authentication status
    loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', (success) => {

      // We need to reject id tokens that were not issued with the default sign-in policy.
      // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
      // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
      if (success.idToken.claims.acr === b2cPolicies.names.resetPassword) {
        window.alert('Password has been reset successfully. \nPlease sign-in with your new password');
        return this.msalService.logout();
      }

      console.log('login succeeded. id token acquired at: ' + new Date().toString());
      console.log(success);

      this.checkAccount();
    });

    loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', (error) => {
      console.log('login failed');
      console.log(error);

      if (error.errorMessage) {
        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          if (isIE) {
            this.msalService.loginRedirect(b2cPolicies.authorities.resetPassword);
          } else {
            this.msalService.loginPopup(b2cPolicies.authorities.resetPassword);
          }
        }
      }
    });

    accessTokenSuccessSubscription = this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
      console.log('access token acquired at: ' + new Date().toString());
      console.log(payload);
    });

    accessTokenFailureSubscription = this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
      console.log('access token acquisition fails');
      console.log(payload);
    });

    this.subscriptions.push(accessTokenSuccessSubscription);
    this.subscriptions.push(accessTokenFailureSubscription);

    // redirect callback for redirect flow (IE)
    this.msalService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });

    this.msalService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));

    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);
  }

  // other methods
  checkAccount(): void {
    this.loggedIn = !!this.msalService.getAccount();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    if (isIE) {
      this.msalService.loginRedirect();
    } else {
      this.msalService.loginPopup();
    }
  }

  logout(): void {
    this.msalService.logout();
  }

  editProfile(): void {
    if (isIE) {
      this.msalService.loginRedirect(b2cPolicies.authorities.editProfile);
    } else {
      this.msalService.loginPopup(b2cPolicies.authorities.editProfile);
    }
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isAuthForm = [
      'login-form',
    ].includes(route.routeConfig.path);

    if (isLoggedIn && isAuthForm) {
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
    }

    return isLoggedIn || isAuthForm;
  }
}
