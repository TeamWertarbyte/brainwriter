import { createApp } from 'mantra-core'
import { combineReducers } from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import initContext from './configs/context'

injectTapEventPlugin()

// Modules
import coreModule from './modules/core'


const coreReducers = coreModule.reducer

// Combine Reducers
const reducer = combineReducers({
  ...coreReducers
})

// Init Context
const context = initContext({ reducer })

// Create App
const app = createApp(context)
app.loadModule(coreModule)
app.init()
