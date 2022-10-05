import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      checked,
      trackId,
      musicObj,
      handleClick,
    } = this.props;
    return (
      <main>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <div>
          <label htmlFor="favorite">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="favorite"
              id="favorite"
              checked={ checked }
              onChange={ (event) => handleClick(event, musicObj) }
            />
          </label>
        </div>
      </main>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  musicObj: PropTypes.objectOf(PropTypes.string).isRequired,
  checked: PropTypes.bool.isRequired,
};
