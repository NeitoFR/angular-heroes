import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService : fetched heroes');
    return of(HEROES);
  }
  add(message: string): void {
    this.messageService.add(message);
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add('Details of hero :'+id+" requested");
    return of(HEROES.find(hero => hero.id === id));
  }
  constructor(private messageService : MessageService) { }

}
