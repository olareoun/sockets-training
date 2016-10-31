module.exports = () => {
  let _messages = []

  return {
    clear,
    list,
    store,
    nextIndex
  }

  function nextIndex() {
    return _messages.length
  }

  function store(msg) {
    _messages.unshift(msg)
  }

  function clear() {
    _messages = []
  }

  function list() {
    return _messages
  }
}
