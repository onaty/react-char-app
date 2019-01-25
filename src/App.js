import React from 'react'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import Chatkit from '@pusher/chatkit-client'
import { tokenUrl, instanceLocator } from './config'
class App extends React.Component {
   
      state = {
            messages: []
      }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'femi',
        tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
        })
    })
    
    chatManager.connect()
    .then(currentUser => {
        currentUser.subscribeToRoom({
            roomId: '19378175',
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
    })
}

    render() {
        return (
            <div className="app">
                <RoomList />
                <MessageList messages={this.state.messages} />
                <SendMessageForm />
                <NewRoomForm />
            </div>
        );
    }
}

export default App