import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogposts',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule],
  templateUrl: './blogposts.component.html',
  styleUrl: './blogposts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogpostsComponent implements OnInit {
    // TODO: API get last 3 posts
    posts: any[] = [];

    constructor(private router: Router) {}

    ngOnInit(): void {
      this.getPosts();
    }
  
    async getPosts(): Promise<void> {
      try {
        const response = await axios.get('http://localhost:4000/ngh/posts/last'); // Fetch posts from the API
        this.posts = response.data.data; // Assign the fetched data to the posts array
        console.log(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching posts:', error); // Log any errors
      }
    }

    // Function to handle the view button click
    viewPost(id: string) {
      // TODO: get the blog with id API call
      console.log('Viewing post: ', id);
      // Optionally, navigate to a post detail page (if using Angular Router)
      // this.router.navigate(['/posts', id]);
    }
}
