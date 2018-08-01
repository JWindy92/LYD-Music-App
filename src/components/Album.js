import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[undefined],
      isPlaying: false,
      isHovered: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if(this.state.isPlaying && isSameSong) {
      this.pause();
    }
    else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  hovered(index) {
    this.setState({isHovered: index});
  }

  notHovered(index) {
    this.setState({ isHovered: false});
  }

  buttonHovered(song, index) {
    const isSameSong = this.state.currentSong === song;
      if(this.state.isHovered === index) {
        return <span className='ion-md-play'></span>;
      }
      else if (this.state.isPlaying === true && isSameSong) {
        console.log('needs pause');
        return <span className='ion-md-pause'></span>;
      }
      else if(this.state.isPlaying === false && isSameSong) {
        return <span className='ion-md-play'></span>
      }
      else {
        return <span>{index + 1}</span>;
      }
   }

  render() {
    return (
      <section className='album'>
        <section id='album-info'>
          <img id='album-cover-art' src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className='album-details'>
            <h1 id='album-title'>{this.state.album.title}</h1>
            <h2 className='artist'>{this.state.album.artist}</h2>
            <div id='release-info'>{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id='song-list'>
          <colgroup>
            <col id='song-number-column' />
            <col id='song-title-column' />
            <col id='song-duration-column' />
          </colgroup>
          <tbody>
          {
            this.state.album.songs.map((song, index) =>
                <tr key={index} className='song' onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.hovered(index)} onMouseLeave={() => this.notHovered(index)}>
                  <td>{this.buttonHovered(song, index)}</td>
                  <td>{song.title}</td>
                  <td>{song.duration} secs</td>
                </tr>
            )
          }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
