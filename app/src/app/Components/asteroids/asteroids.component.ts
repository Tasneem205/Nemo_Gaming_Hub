import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';  // Import RouterModule


@Component({
  selector: 'app-asteroids',
  standalone: true,
  templateUrl: './asteroids.component.html',
  styleUrl: './asteroids.component.css'
})

export class AsteroidsComponent {
  navigateToExternal(url: string) {
    window.location.href = url;
  }
}
