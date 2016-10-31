import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import * as Connection from './modules/connection'
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
          <div className="params">
            <input type="number" value={this.props.timeout} min="1" max="1000"
              onChange={(ev) => this.props.setTimeout(ev.target.value) }/>
            <input type="number" value={this.props.msgsPerLoop} min="1" max="1000"
              onChange={(ev) => this.props.setMsgsPerLoop(ev.target.value) }/>
          </div>
          <div className="actions">
            <button onClick={ this.props.startStress } disabled={this.props.stress}>Estresar</button>
            <button onClick={ this.props.stopStress } disabled={!this.props.stress}>Parar</button>
            <button onClick={ this.props.clearMessages } disabled={this.props.stress}>Borrar</button>
          </div>
        </section>
        <section className="messages">
          <h1>Mensajes</h1>
          { this.props.fetching? <p>Cargando...</p> : null }
          { this.props.messages.visible.map((msg) => <p key={msg.id}>{msg.name}</p>) }
          <button onClick={ this.props.loadMore } disabled={ this.props.stress } >Ver mas</button>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.messages, state.controls)
}

const mapDispatchToProps = {
  connectSource: Connection.connectSource,
  getMessages: Messages.getMessages,
  clearMessages: Messages.clearMessages,
  loadMore: Messages.loadMore,
  startStress: Controls.startStress,
  stopStress: Controls.stopStress,
  setTimeout: Controls.setTimeout,
  setMsgsPerLoop: Controls.setMsgsPerLoop
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
