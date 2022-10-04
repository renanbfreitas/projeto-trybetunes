import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    nome: '',
    loading: false,
    musicAlbum: [],
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ nome: value });
  };

  handleClick = () => {
    const { nome } = this.state;
    this.setState({ loading: true }, async () => {
      const musicAlbum = await searchAlbumsAPI(nome);
      this.setState({ musicAlbum, nome, loading: false });
    });
  };

  render() {
    const {
      nome,
      musicAlbum,
      loading,
    } = this.state;
    const VALIDBUTTON = 2;
    const validInput = nome.length >= VALIDBUTTON;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (<Loading />
        ) : (
          <div>
            <form>
              <label htmlFor="search">
                <input
                  type="text"
                  placeholder="Nome do Artista"
                  data-testid="search-artist-input"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ !validInput }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
            <div>
              {!musicAlbum.length ? 'Nenhum álbum foi encontrado' : (
                <div>
                  <h1>{`Resultado de álbuns de: ${nome}`}</h1>
                  {musicAlbum.map((music) => (
                    <div key={ music.collectionId }>
                      <img src={ music.artworkUrl100 } alt={ music.artistName } />
                      <h3>{music.artistName}</h3>
                      <p>{music.collectionPrice}</p>
                      <p>{music.releaseDate}</p>
                      <p>{music.trackCount}</p>
                      <Link
                        to={ `/album/${music.collectionId}` }
                        data-testid={ `link-to-album-${music.collectionId}` }
                      >
                        {music.collectionName}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
