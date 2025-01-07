import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
@Injectable()
export class AppService {
  getData(): { message: string } {
    
    return { message: 'Welcome to beshop!' };

  }
  // async getGoogleAnalytics(): Promise<{ message: string; }> {
  //   const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];
  //   const jwt = new google.auth.JWT("rausachtrangia@inspiring-bonus-128710.iam.gserviceaccount.com",
  //     null,"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDyE5M4tIcfO+S6\nnUkEdo0tOQPN3pFRQCoy1ZGg0iPa/Ac9Et2NJYmeW6Slps/xqloam6Kn4ZXYyje7\nOd2qmo4lx1Z/x0m4fYrJioCZHWwllwuig3mmt9FJXRmSCrJ+m9ymEggT57y6TBHp\ny4iJ/EEJc7UeIHZfDNopF9MpYIgGnMghpw43kdNWzQ5ar2b2Rqv5rE1rT8zmUyCg\n4lR9YlRLU2ypW3S/SNHiaynKTNXqG2EkSc3XwqXvBmMn/Zut9/2mxp7cd83fVo0i\nzQFSSpUjLZlPfVLmSZ3a5HDVhcvEzOJDTqGbfNchNn/6SovDS758q0s7zfv0ofL9\nJjp9tyQ7AgMBAAECggEAUMuCxBbQ0HZriXNshu5QgUr5v5Ds3Hr3ep74a34nlHOw\nsMwmoPDp5S4+HkG2Prj2ONJAMBslKcWYY0dVehb6oZZOAvjPXKGeHFU7RZ9h1Iv8\nyKFsDV5lnkBSBAHJAGPh+ZWkF4ytW1p/UhJqAG/ufwqc5TC9gUznVXbLthAvZlDw\naSFPeNRKhW5/qtfBaDjhWjACgLg8ve+6pLT4VDRTppGAXkoyov7q9UjOLSdqkmP8\nW+THH9b7miauiSqj7O+Qw0eSyr4i+I3dN6p74tiSlyzleJZsMWVBRU2yUYLluZcy\nTSZodxvHjs/8FLSu5NcatG/CZzUEAuDdkXBkwnBQBQKBgQD/q/IA9FlDzzAqPQvA\nI/6n++ioSsiWGK7bqPV06/c+/rRmH7g8BZ9Kee4e+cS3X47cmqIuJfwR83NYEstY\nFodKo9k2cuNlKVzOnMG0TY1l8P4zQHkz499VWRsvDbW9K75MbgXgnd+sfwREwJvg\nWFRE3ng//JnU9wnRAty+zX5ALwKBgQDyYykCrkttwBgwHwbszb+mR344+Ioxb2R3\nSgHwgc3FKONdK6sKXWJTDKoPkpVKBEcqLldaore6Dxq+utqORBA/QJoKtw8Mls+G\npOYDK5/5B1IWK28PXp+A8Pumx9nlpBysAezj94TxoTxrrp3HsZAtlCz1vGeR3SK3\nZQ3bRiyttQKBgB63x/G5aegtwnmwr/K74GLKb1+Y7JSsDoYxvJv5pdEZxQ7oDLiZ\nbFQEZkmudKYbgwyaP5YP1kNJ3rfcOjYxLrwXB4f1McD7wTzJtLQ3BSAUXlZGDsnf\nPPwCIrP6j7VUxh5ksawVC8Sr1hV0lsXTlvxXRldZwBnIPJOyJld+VQbdAoGBAKd/\nLo/Tsfwdipl2V2q8o3tcXDUySwzuVRa55a01heSA5N01l/SJo7CQR9SLDu8fFa5o\nZ6USXLQOTAURSoaVMkUDd2+AIL4qWS5KNUhrlRiZnngDe7O7R63q2XvfDwxJ5CZZ\nDkJagVwYd5BSEmY0pdVZV9hYYZnCnoLtKi4kyCshAoGAGG1nL3NcGEIzbnqucH/H\nS3M6N1eo9LC20pP4XysGZAO+A6FP7hv8Oer4llXdAFVfcgonLiqRkn1ZNcklh7Q4\nJikfGAnYLNfZUVzNQobVo3J7A092XM6wXbienUOPV0TbKh69Ug48yqE1Q637xmKf\nXVDuOMCZ8k31lU3SVHPYOaI=\n-----END PRIVATE KEY-----\n",
  //     scopes
  //   );
  //   const test = await jwt.authorize();
  //   console.log(test);
  //   const response = await google.analytics("v3").data.ga.get({
  //     auth: jwt,
  //     ids: "ga:436474169",
  //     "start-date": "30daysAgo",
  //     "end-date": "today",
  //     metrics: "ga:pageviews",
  //   });

  //   console.log(response);

  //   // jwt.authorize((err, response) => {      
  //   //   google.analytics('v3').data.ga.get(
  //   //     {
  //   //       auth: jwt,
  //   //       ids: 'ga:436474169',
  //   //       'start-date': '30daysAgo',
  //   //       'end-date': 'yesterday',
  //   //       metrics: 'ga:sessions',
  //   //     },
  //   //     (err, result) => {
  //   //     //  console.log(err, result);
  //   //     }
  //   //   );
  //   // });
  //   return { message: 'Welcome to beshop!' };
  // }
}
