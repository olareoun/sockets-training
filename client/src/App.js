import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import * as Messages from './modules/messages'
import * as Controls from './modules/controls'

class App extends Component {
  componentDidMount() {
    this.props.connectSource()
    this.props.getMessages()
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <section className="controls">
          <h1>Controles</h1>
          <input type="number" value={this.props.timeout} onChange={(ev) => this.props.setTimeout(ev.target.value) }/>
          <button onClick={ this.props.startStress } disabled={this.props.stress}>Estresar</button>
          <button onClick={ this.props.stopStress } disabled={!this.props.stress}>Parar</button>
          <button onClick={ this.props.clearMessages } disabled={this.props.stress}>Borrar</button>
        </section>
        <section className="messages">
          <h1>Mensajes</h1>
          { this.props.fetching? <p>Cargando...</p> : null }
          { this.props.messages.visible.map((msg) => <p key={msg.id}>{msg.name}</p>) }
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.messages, state.controls)
}

const mapDispatchToProps = {
  connectSource: Messages.connectSource,
  getMessages: Messages.getMessages,
  clearMessages: Messages.clearMessages,
  startStress: Controls.startStress,
  stopStress: Controls.stopStress,
  setTimeout: Controls.setTimeout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
