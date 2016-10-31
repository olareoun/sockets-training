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
    const { msgsPerLoop, timeout } = this.cfg
    this.intervalFn = setInterval(() => {
      for (let i = 0; i < msgsPerLoop; i++) {
        const id = this.messages.nextIndex()
        const msg = { name: `cosa ${id}`, id: id }
        this.messages.store(msg)
        this.io.emit('newMessage', msg)
      }
    }, timeout)
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
