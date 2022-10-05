import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Album extends React.Component {
  state = {
    musics: [],
    favorite: [],
    albumInfo: {},
    loading: true,
    favoriteMusic: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.consultSong(id);
    this.favoriteMusic();
  }

  favoriteMusic = async () => {
    this.setState({ loading: true });
    const data = await getFavoriteSongs();
    this.setState({ favoriteMusic: data, loading: false });
    const { favoriteMusic } = this.state;
    console.log(favoriteMusic);
  };

  consultSong = async (id) => {
    this.setState({ loading: true });
    const { musics } = this.state;
    const data = await getMusics(id);
    data.forEach((result, i) => ((i === 0)
      ? this.albumInfo(result)
      : musics.push(result)));
    this.setState({
      loading: false,
    });
  };

  albumInfo = (info) => {
    this.setState({
      albumInfo: info,
    }, () => {
      this.setState({ loading: false });
    });
  };

  handleClick = async (event, object) => {
    const { target } = event;
    const { favorite } = this.state;
    this.setState({ loading: true }, async () => {
      if (target.checked) {
        await addSong(object);
        this.setState({
          loading: false,
          favorite: [...favorite, object.trackId],
        });
      } else {
        this.setState({ loading: true });
        await removeSong(object);
        this.setState({
          loading: false,
          favorite: favorite.filter((song) => song !== object.trackId),
        });
      }
    });
  };

  render() {
    const { musics, loading, albumInfo, favorite } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (<Loading />)
          : (
            <div>
              <h1 data-testid="artist-name">{albumInfo.artistName}</h1>
              <h3 data-testid="album-name">{albumInfo.collectionName}</h3>
              <div>
                {musics.map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    previewUrl={ music.previewUrl }
                    trackName={ music.trackName }
                    musicObj={ music }
                    trackId={ music.trackId }
                    checked={ favorite.some((trackid) => music.trackId === trackid) }
                    handleClick={ this.handleClick }
                  />
                ))}
              </div>
            </div>
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
