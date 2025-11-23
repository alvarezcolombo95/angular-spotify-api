import { Component, OnInit } from '@angular/core';
import { RatingService, AlbumRating } from '../services/rating.service';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';

interface DisplayRatingGroup {
  stars: number;
  albums: {
    id: string;
    name: string;
    artists: string;
  }[];
}

@Component({
  selector: 'app-my-ratings',
  templateUrl: './my-ratings.component.html',
  styleUrls: ['./my-ratings.component.css']
})
export class MyRatingsComponent implements OnInit {

  ratingGroups: DisplayRatingGroup[] = [];

  constructor(
    private ratingService: RatingService,
    private spotifyService: SpotifySearchItemService
  ) {}

  async ngOnInit() {
  const ratings = this.ratingService.getRatingsSorted();
  const grouped: { [stars: number]: DisplayRatingGroup } = {};

  for (const entry of ratings) {

    const albumInfo = {
      id: entry.albumId,
      name: entry.name,
      artists: entry.artists
    };

    if (!grouped[entry.rating]) {
      grouped[entry.rating] = {
        stars: entry.rating,
        albums: []
      };
    }

    grouped[entry.rating].albums.push(albumInfo);
  }

  this.ratingGroups = Object.values(grouped).sort((a, b) => b.stars - a.stars);
}

  getStarsArray(n: number) {
    return Array(n).fill(0);
  }
}