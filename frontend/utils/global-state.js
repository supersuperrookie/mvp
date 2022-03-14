import globalHook from 'use-global-hook'
import { actions } from './actions'

const initialState = {
    did: undefined,
    network: 'mumbai'
}

export const useGlobal = globalHook(initialState, actions);