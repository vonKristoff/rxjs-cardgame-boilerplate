import { of, Subject } from 'rxjs'; 
import { map, scan, shareReplay,  startWith, tap } from 'rxjs/operators';

const playersController = new Subject()

const STATE = []

const PLAYER = {
  id: null,
  label: '',
  score: 0,
  hasTurn: false,
  hand: []
}

const defaultAction = { type: 'INIT', message: 'init' }

const players$ = playersController.asObservable()
  .pipe(
    startWith(defaultAction),
    scan(reducer, STATE),
    // shareReplay(1),
  )

function reducer(state, action) {
  return COMMANDS[action.type]?.(state, action) ?? state
}

const COMMANDS = {
  "ADD_PLAYER": addPlayer,
  "CYCLE_TURN": cycle
}

function addPlayer(state) {
  const id = state.length + 1
  const label = `player-${id}`
  const hasTurn = state.length < 1 ? true : false

  const newPlayer = { id, label, hasTurn }

  return [...state, { ...PLAYER, ...newPlayer }]
}

function cycle(state) {
  const i = state.findIndex(p => p.hasTurn)
  const nextIndex = (i + 1) === state.length ? 0 : i + 1
  return state.map((p, index) => {
    if(p.hasTurn) p.hasTurn = false
    if(nextIndex === index) p.hasTurn = true
    return p
  })
}

export { players$, playersController }