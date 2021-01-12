import { Component, Injectable, Input, NgModule } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Routes, RouterModule, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as Rx from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Rx.Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('in guard');
    return Rx.of(undefined).pipe(
      delay(100),
      map(() => true),
      tap(() => {
        console.log('after delay');
      })
    );
  }
}

@Component({
  template: `
    This works:
    <nav>
      <ul>
        <li>
          <a routerLink="/first">
            First Component
          </a>
        </li>
        <li>
          <a routerLink="/second">
            Second Component
          </a>
        </li>
      </ul>
    </nav>
    This doesn't:
    <nav>
      <ul>
        <li>
          <app-link-wrapper routerLink="/first">
            First Component
          </app-link-wrapper>
        </li>
        <li>
          <app-link-wrapper routerLink="/second">
            Second Component
          </app-link-wrapper>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class BrokenLinkComponent {}

@Component({
  template: `
    this is first
  `,
})
export class FirstComponent {}

@Component({
  template: `
    this is second
  `,
})
export class SecondComponent {}

@Component({
  selector: 'app-link-wrapper',
  template: `
    <a [routerLink]="routerLink"><ng-content></ng-content></a>
  `,
})
export class LinkWrapperComponent {
  @Input() routerLink: string;
}

const routes: Routes = [{
  path: '',
  component: BrokenLinkComponent,
  children: [
    {
      path: 'first',
      canActivate: [TestGuard],
      component: FirstComponent,
    },
    { path: 'second', component: SecondComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy',
    urlUpdateStrategy: 'eager',
  })],
  declarations: [
    FirstComponent,
    SecondComponent,
    LinkWrapperComponent,
    BrokenLinkComponent,
  ],
  providers: [TestGuard],
  exports: [RouterModule],
})
export class AppRoutingModule { }
