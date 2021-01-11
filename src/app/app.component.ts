import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    Hello
    <h1>Angular Router App</h1>
    <!-- This nav gives you links to click, which tells the router which route to use (defined in the routes constant in  AppRoutingModule) -->
    <nav>
      <ul>
        <li><a routerLink="/first-component" routerLinkActive="active">First Component</a></li>
        <li><a routerLink="/second-component" routerLinkActive="active">Second Component</a></li>
      </ul>
    </nav>
    <div *ngPf="foo"></div>
    <div *someDirective="'some-value'"></div>
    <div ngPf="foo"></div>
    <ng-container *ngTemplateOutle="myTemplate"></ng-container>
    <ng-template #myTemplate>
      My template is here
    </ng-template>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'test-ng10';
}
