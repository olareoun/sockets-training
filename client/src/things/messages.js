import * as Actions from '../modules/messages/actions'

module.exports = (() => {
  let _dispatch
  let _msgs = []

  setInterval(() => {
    const toDispatch = _msgs.concat([])
    _msgs = []
    if (toDispatch.length) {
      console.log("#########")
      console.log(toDispatch)
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
    console.log("add", msg.id)
    _msgs.unshift(msg)
  }

  function setDispatcher(dispatch) {
    _dispatch = dispatch
  }
})()
