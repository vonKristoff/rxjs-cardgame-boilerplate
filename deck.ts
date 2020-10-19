import { of, Subject } from 'rxjs'; 
import { map, scan, shareReplay,  startWith, tap } from 'rxjs/operators';

// import { players$, playersController } from './players'

const deckController = new Subject()

const state = []

// players$.pipe(tap(e=>console.log(e,'pl')))

const defaultAction = { type: 'INIT', message: 'init' }

const deck$ = deckController.asObservable()
  .pipe(
    startWith(defaultAction),
    scan(commandDispatcher, state),
    shareReplay(1)
  )

function commandDispatcher(state, action) {
  
  return [...state, action.message]
}


export { deck$, deckController }