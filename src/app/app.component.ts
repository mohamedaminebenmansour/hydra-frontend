import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Added this for ngModel

@Component({
  selector: 'app-root',
  standalone: true, // This tells Angular it's a standalone component
  imports: [FormsModule], // Added this
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  names: any[] = [];
  newName: string = '';

  // PASTE YOUR RENDER BACKEND URL HERE + /api/test
  apiUrl = 'https://YOUR-RENDER-BACKEND-URL.onrender.com/api/test';

  constructor(private http: HttpClient) {
    this.fetchNames();
  }

  fetchNames() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.names = data;
    });
  }

  save() {
    this.http.post(this.apiUrl, { name: this.newName }).subscribe(() => {
      this.newName = '';
      this.fetchNames();
    });
  }
}
