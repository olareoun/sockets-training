class Stress {
  constructor(cfg, io, messages) {
    this.cfg = cfg
    this.io = io
    this.messages = messages
  }

  getParams() {
    return this.cfg
  }

  startStress() {
    this.cfg.stress = true
    const { timeout } = this.cfg
    this.intervalFn = setInterval(
      this.generateMsgs.bind(this),
      timeout
    )
  }

  generateMsgs() {
    const { msgsPerLoop } = this.cfg
    for (let i = 0; i < msgsPerLoop; i++) {
      const msg = this.messages.generateNew()
      this.io.emit('newMessage', msg)
    }
  }

  stopStress() {
    clearInterval(this.intervalFn)
    this.cfg.stress = false
  }

  restartStress() {
    if (this.cfg.stress) {
      this.stopStress()
      this.startStress()
    }
  }

  setTimeout(timeout) {
    this.cfg.timeout = timeout
    this.restartStress()
  }

  setMsgsPerLoop(msgsPerLoop) {
    this.cfg.msgsPerLoop = msgsPerLoop
    this.restartStress()
  }

}

module.exports = Stress
