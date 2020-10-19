import { of, Subject } from 'rxjs'; 
import { map, scan, shareReplay,  startWith } from 'rxjs/operators';

const playerController = new Subject()

const state = {
  id: null,
  label: '',
  score: 0,
  hasTurn: false
}

const defaultAction = { type: 'INIT', message: 'init' }

const player$ = playerController.asObservable()
  .pipe(
    startWith(defaultAction),
    scan(commandDispatcher, state),
    shareReplay(1)
  )

function commandDispatcher(state, action) {
  
  return [...state, action.message]
}


export { player$, playerController }