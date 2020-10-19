import { of, Subject } from 'rxjs'; 
import { map, scan, shareReplay,  startWith } from 'rxjs/operators';

const gameController = new Subject()

const state = []

const defaultAction = { type: 'INIT', message: 'init' }

const game$ = gameController.asObservable()
  .pipe(
    startWith(defaultAction),
    scan(commandDispatcher, state),
    shareReplay(1)
  )

function commandDispatcher(state, action) {
  
  return [...state, action.message]
}


export { game$, gameController }