import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const audioBookPlaylist = [
	{
		title: 'Hamlet - Act I',
		author: 'William Shakespeare',
		source: 'Librivox',
		uri:
			'file:///C:/vabmusic/assets/sound/piloto.mp3',
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
	{
		title: 'Hamlet - Act II',
		author: 'William Shakespeare',
		source: 'Librivox',
		uri:
			'file:///C:/vabmusic/assets/sound/piloto.mp3',
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
	{
		title: 'Hamlet - Act III',
		author: 'William Shakespeare',
		source: 'Librivox',
		uri: 'file:///C:/vabmusic/assets/sound/piloto.mp3',
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
	{
		title: 'Hamlet - Act IV',
		author: 'William Shakespeare',
		source: 'Librivox',
		uri:
			'file:///C:/vabmusic/assets/sound/piloto.mp3',
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
	{
		title: 'Hamlet - Act V',
		author: 'William Shakespeare',
		source: 'Librivox',
		uri:
			'file:///C:/vabmusic/assets/sound/piloto.mp3',
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	}
]

export default class musica extends React.Component {
	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true
	}

	async componentDidMount() {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			})

			this.loadAudio()
		} catch (e) {
			console.log(e)
		}
	}

	async loadAudio() {
		const { currentIndex, isPlaying, volume } = this.state

		try {
			const playbackInstance = new Audio.Sound()
			const source = {
				uri: audioBookPlaylist[currentIndex].uri
			}

			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			await playbackInstance.loadAsync(source, status, false)
			this.setState({
				playbackInstance
			})
		} catch (e) {
			console.log(e)
		}
	}

	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
	}

	handlePlayPause = async () => {
		const { isPlaying, playbackInstance } = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})
	}

	handlePreviousTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex : (currentIndex === 0 ? audioBookPlaylist.length -1 : currentIndex-1)
			});
			this.loadAudio()
		}
	}

	handleNextTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex: (currentIndex+1 > audioBookPlaylist.length - 1 ? 0 : currentIndex+1)
			});
			this.loadAudio()
		}
	}

  renderFileInfo() {
		const { playbackInstance, currentIndex } = this.state
		return playbackInstance ? (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{audioBookPlaylist[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].author}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].source}
				</Text>
			</View>
		) : null
	}

  render() {
    return (
      <Background>
          <Image
            style={styles.albumCover}
            source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
          />
          <View style={styles.controls}>
            <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
              <Ionicons name='ios-skip-backward' size={48} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
              {this.state.isPlaying ? (
                <Ionicons name='ios-pause' size={48} color='white' />
              ) : (
                  <Ionicons name='ios-play-circle' size={48} color='white' />
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
              <Ionicons name='ios-skip-forward' size={48} color='white' />
            </TouchableOpacity>
          </View>
          {this.renderFileInfo()}
        </Background>
      
    )
  }
}
const Background = ({ children }) => {
  return(
    <LinearGradient
      colors={['#292929', '#4e4e4e']}
      style={{
        flex: 1,
        alignItems: 'center',
		justifyContent: 'center'
    }}>
    {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
  },
  
  albumCover: {
    width: 250,
    height: 250
  },
  trackInfo: {
    padding: 40,
    backgroundColor: 'white'
  },

  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'white'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row'
  }
})
