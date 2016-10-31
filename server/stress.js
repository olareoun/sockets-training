module.exports = (cfg, io, messages) => {
  let _cfg = Object.assign({}, cfg)
  let intervalFn

  return {
    getParams,
    startStress,
    stopStress,
    setTimeout,
    setMsgsPerLoop
  }

  function getParams() {
    return _cfg
  }

  function startStress() {
    _cfg.stress = true
    const { timeout } = _cfg
    _intervalFn = setInterval(
      generateMsgs.bind(this),
      timeout
    )
  }

  function generateMsgs() {
    const { msgsPerLoop } = _cfg
    for (let i = 0; i < msgsPerLoop; i++) {
      const msg = messages.generateNew()
      io.emit('newMessage', msg)
    }
  }

  function stopStress() {
    clearInterval(_intervalFn)
    _cfg.stress = false
  }

  function restartStress() {
    if (_cfg.stress) {
      stopStress()
      startStress()
    }
  }

  function setTimeout(timeout) {
    _cfg.timeout = timeout
    restartStress()
  }

  function setMsgsPerLoop(msgsPerLoop) {
    _cfg.msgsPerLoop = msgsPerLoop
    restartStress()
  }

}

