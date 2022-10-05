import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  state = {
    musics: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const data = await getMusics(match.params.id);
    this.setState({ musics: data });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { musics.length > 0 && (
          musics.map((album, song) => (
            song === 0
              ? (
                <div key={ song }>
                  <h1 data-testid="artist-name">{album.artistName}</h1>
                  <h2 data-testid="album-name">{album.collectionName}</h2>
                </div>)
              : <MusicCard key={ song } album={ album } />
          ))
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
  params: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
};
