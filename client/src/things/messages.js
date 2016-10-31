import * as Actions from '../modules/messages/actions'

module.exports = (() => {
  let _dispatch
  let _msgs = []

  setInterval(() => {
    const toDispatch = _msgs.concat([])
    _msgs = []
    if (toDispatch.length) {
      _dispatch(Actions.messagesReceived(toDispatch))
    }
  }, 100)

  return {
    setDispatcher,
    addMany,
    add
  }

  function addMany(msgs) {
    _dispatch(Actions.messagesReceived(msgs))
  }

  function add(msg) {
    _msgs.unshift(msg)
  }

  function setDispatcher(dispatch) {
    _dispatch = dispatch
  }
})()
