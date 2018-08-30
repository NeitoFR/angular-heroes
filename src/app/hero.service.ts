import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private dbUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.dbUrl)
      .pipe(tap(heroes => this.add('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }
  add(message: string): void {
    this.messageService.add('Hero Service: ' + message);
  }
  getHero(id: number): Observable<Hero> {
    const url = this.dbUrl+"/"+id;

    return this.http.get<Hero>(url).pipe(
      tap (_ => this.add('fetched hero : '+id)),
      catchError(this.handleError<Hero>("getHero id="+id))
    );
  }
  constructor(private messageService: MessageService, private http: HttpClient) { }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.add(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
