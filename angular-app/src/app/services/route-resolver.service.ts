/*import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';

export const searchResultsResolver: ResolveFn<any> = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const searchStr = route.paramMap.get('searchStr');
    const searchType = route.paramMap.get('searchType');
    return inject(SpotifySearchItemService).asyncCallSearchItem(searchStr, searchType);
  };*/
