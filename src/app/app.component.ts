import { Component, HostBinding, HostListener, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './site/main/main.component';
import { CommonModule } from '@angular/common';
import { NotifierModule } from 'angular-notifier';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './admin/users/auth/auth.service';
import { UsersInterceptor } from './admin/users/auth/users.interceptor';
import { AuthModule } from './admin/users/auth/auth.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NotifierModule,
    AuthModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  items$!: Observable<any[]>;
  @HostListener('window:scroll')
  onScroll() {
    // const viewportHeight = window.innerHeight;
    // console.log(window.scrollY);
    // console.log(viewportHeight);
  }

  constructor(
    private _AppService: AppService,
   // private _AngularFireAnalytics: AngularFireAnalytics,
  ) {}
  ngOnInit() {    
    //this._AngularFireAnalytics.logEvent('goal_completion', { name: 'lever_puzzle'});
    // const aCollection = collection(this.firestore, 'items')
    // this.items$ = collectionData(aCollection);
    // console.log(this.items$);
    
    // const app = initializeApp(environment.firebaseConfig);
    // const analytics = getAnalytics(app);

    // Log an event when the component is initialized
    // this._AppService.getOnlineUsers().then((response:any) => {
    //   console.log(response.result);
    // }, (reason:any) => {
    //   console.log('Error: ' + reason.result.error.message);
    // });
  }
  
  title = 'Rau Sạch Trần Gia';
  
}
