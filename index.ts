import { fromEvent, merge,  of } from 'rxjs'; 
import { distinctUntilChanged, distinctUntilKeyChanged,  filter, map, mergeMap,  share,  switchMap,  tap } from 'rxjs/operators';

import { deck$ } from './deck';
import { players$, playersController } from './players'

// deck 
// playersList
// game

const goButton$ = fromEvent(document.querySelector('.play'), 'click').pipe(
  tap(e => playersController.next({ type: 'CYCLE_TURN' }))
)

const addButton$ = fromEvent(document.querySelector('.add'), 'click')
  .pipe(
    tap(e => playersController.next({ type: 'ADD_PLAYER' }))
  )

const turn$ = players$.pipe(
  mergeMap(state => state.filter(player => player.hasTurn)),
)

const game = merge(players$, addButton$, goButton$, turn$)

game.subscribe()