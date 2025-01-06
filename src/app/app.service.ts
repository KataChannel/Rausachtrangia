import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
declare var gapi: any;
@Injectable({providedIn: 'root'})
export class AppService {
    constructor() { }
    private isDarkTheme = new BehaviorSubject<boolean>(false);
    isDarkTheme$ = this.isDarkTheme.asObservable();

    toggleTheme() {
        this.isDarkTheme.next(!this.isDarkTheme.getValue());
    }

    setDarkTheme(isEnabled: boolean) {
        this.isDarkTheme.next(isEnabled);
    }

    getDarkTheme(): boolean {
        return this.isDarkTheme.getValue();
    }
    initClient() {
        gapi.load('client:auth2', () => {
          gapi.client.init({
            apiKey: 'AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc',
            // clientId: '677966057043-g9tjgmsmbsr1j7n4bfoqcq22t8c7go75.apps.googleusercontent.com',
            discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
            scope: 'https://www.googleapis.com/auth/analytics.readonly'
          }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          }, (error:any) => {
            console.log('Error: ' + error);
            
            console.log(error);
          });
        });
      }
    
      updateSigninStatus(isSignedIn:any) {
        if (isSignedIn) {
          console.log("Is Sign"); 
        } else {
          // User is not signed in. Start Google auth flow.
          gapi.auth2.getAuthInstance().signIn();
          console.log("Not Sign");
        }
      }
    
      // getAnalyticsData() {
      //   return gapi.client.analyticsreporting.reports.batchGet({
      //     'reportRequests': [
      //       {
      //         'viewId': 'YOUR_VIEW_ID',
      //         'dateRanges': [{'startDate': '7daysAgo', 'endDate': 'today'}],
      //         'metrics': [{'expression': 'ga:sessions'}, {'expression': 'ga:users'}]
      //       }
      //     ]
      //   });
      // }
      getOnlineUsers() {
        return gapi?.client?.analytics?.data?.realtime?.get({
          'ids': 'ga:' + '436474169',
          'metrics': 'rt:activeUsers'
        });
      }
}
