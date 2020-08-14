import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  NativeModules,
  asset,
  Image
} from 'react-360';
import { connect, changeRoom } from './store';

const { AudioModule } = NativeModules;

class AudioPanel extends React.Component {

  playAmbientMusic() {
    AudioModule.playEnvironmental({
      source: asset('audio/ambient.wav'),
      volume: 0.3
    });
  }

  stopAmbientMusic() {
    AudioModule.stopEnvironmental();
  }
  
  render() {
    return(
      <View
       style={styles.audioPanel}>
        <VrButton
         onClick={() => this.playAmbientMusic()}>
          <Image
           style={{height: 50, width: 50}}
           source={asset('audioOn.png')} />
        </VrButton>
        <VrButton
         onClick={() => this.stopAmbientMusic()}>
        <Image
           style={{height: 50, width: 50}}
           source={asset('audioOff.png')} />
        </VrButton>
      </View>
    );
  }
}

class InfoPanel extends React.Component {

  render() {
    return (
      <View>
        <View style={styles.infoPanel}>
          <Text style={styles.header}>
            Room Info
          </Text>
          <Text style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {this.props.info}
          </Text>
        </View>
      </View>
    );
  }
};

class Button extends React.Component {

  state = {
    hover: false
  }

  clickHandler(roomSelection) {
    changeRoom(roomSelection);
  }
  
  render() {
    return(
      <VrButton
        onEnter = {() => this.setState({hover: true})}
        onExit = {() => this.setState({hover: false})}
        onClick={() => this.clickHandler(this.props.room)}
        style= {this.state.hover ? styles.hover: styles.button}
      >
        <Text style={{textAlign: 'center'}}>{this.props.room.split('_').join(' ')}</Text>
      </VrButton>
    );
  }
}

export default class ButtonInfoPanel extends React.Component {

  createRoomButtons(adjacentRooms) {
    let rooms = adjacentRooms;
    let buttons = [];

    rooms.map(room => {
      buttons.push(
        <Button key={`${room}` + 'button'} room={room} />
      )
    });

    return buttons;
  }

  render() {
    return (
      <View>
        <View style={styles.buttonPanel}>
          <Text style={styles.header}>
            Room Selection
          </Text>
          {this.createRoomButtons(this.props.adjacentRooms)}
          <AudioPanel />
        </View>
      </View>
    );
  }
};

const ConnectedButtons = connect(ButtonInfoPanel);
const ConnectedInfoPanel = connect(InfoPanel);

const styles = StyleSheet.create({
  infoPanel: {
    width: 400,
    height: 400,
    backgroundColor: 'rgb(255, 200, 50)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
    borderRadius: 20,
    opacity: 0.8
  },
  buttonPanel: {
    width: 400,
    height: 400,
    opacity: 0.8,
    backgroundColor: 'rgb(255, 200, 50)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'rgb(0, 0, 0)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
  },
  hover: {
    width: 200,
    backgroundColor: 'rgb(0, 45, 72)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  audioPanel: {
    flexDirection: 'row',
  }
});

AppRegistry.registerComponent('ConnectedButtons', () => ConnectedButtons);
AppRegistry.registerComponent('ConnectedInfoPanel', () => ConnectedInfoPanel);
