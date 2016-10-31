module.exports = () => {
  let _messages = []

  return {
    clear,
    list,
    generateNew
  }

  function generateNew() {
    const id = nextIndex()
    const msg = { id, name: id }
    store(msg)
    return msg
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
