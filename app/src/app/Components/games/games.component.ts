import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import axios from "axios";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent implements OnInit{

  games: any = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getGames();
  }

  async getGames(): Promise<void> {
    try {
      const response = await axios.get('http://localhost:4000/ngh/games/');
      this.games = response.data.data; // Assign the fetched data to the games array
      console.log(this.games);
    } catch (error) {
      console.error('Error fetching games:', error);
      this.games = [];
    }
  }

  // Function to handle the play button click
  playGame(gameUrl: string) {
    window.open(`${gameUrl}`, '_blank');
  }
}
