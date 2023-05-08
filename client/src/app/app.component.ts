import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  shorturl = '';
  longurl = '';

  constructor(private http: HttpClient) {}

  clear() {
    window.location.reload();
  }

  shorten(longurl: string) {
    this.http
      .post(`http://localhost:3000/api/shorten`, { longurl })
      .subscribe((res: any) => {
        this.shorturl = res['shorturl'];
      });
  }

  lengthen(shorturl: string) {
    this.http
      .get(`http://localhost:3000/api/search/${shorturl}`)
      .subscribe((res: any) => {
        this.longurl = res['longurl'];
      });
  }
}
