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
    const ratings = this.ratingService.getRatingsSorted(); // highest first
    const grouped: { [stars: number]: DisplayRatingGroup } = {};

    for (const entry of ratings) {
      // Load album details from Spotify
      const album: any = await this.spotifyService.asyncCallGetAlbum(entry.albumId);

      const albumInfo = {
        id: entry.albumId,
        name: album.name,
        artists: album.artists.map((a: any) => a.name).join(', ')
      };

      if (!grouped[entry.rating]) {
        grouped[entry.rating] = {
          stars: entry.rating,
          albums: []
        };
      }

      grouped[entry.rating].albums.push(albumInfo);
    }

    // Convert object → array sorted by stars descending
    this.ratingGroups = Object.values(grouped).sort((a, b) => b.stars - a.stars);
  }

  getStarsArray(n: number) {
    return Array(n).fill(0);
  }
}