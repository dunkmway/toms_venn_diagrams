import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatExpansionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _snackBar = inject(MatSnackBar);

  left = signal('');
  right = signal('');
  intersection = signal('');

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['left']) {
        this.left.set(decodeURI(params['left']))
      }
      if (params['right']) {
        this.right.set(decodeURI(params['right']))
      }
      if (params['intersection']) {
        this.intersection.set(decodeURI(params['intersection']))
      }
    });
  }

  private getShareableUrl() {
    const url = new URL(window.location.origin);
    url.searchParams.set('left', encodeURI(this.left()));
    url.searchParams.set('right', encodeURI(this.right()));
    url.searchParams.set('intersection', encodeURI(this.intersection()));
    return url.toString();
  }

  share() {
    const url = this.getShareableUrl();
    navigator.clipboard.writeText(url);
    this._snackBar.open("Copied to clipboard", 'OK', {
      duration: 3000
    });
  }
}
