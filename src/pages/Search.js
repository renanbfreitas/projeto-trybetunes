import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      disabledButton: true,
      nome: '',
      loading: false,
      redirect: false,
    };
  }

  formButton = ({ target }) => {
    const validButton = 2;
    if (target.value.length >= validButton) {
      this.setState({ disabledButton: false, nome: target.value });
    } else {
      this.setState({ disabledButton: true, nome: target.value });
    }
  };

  validState = () => {
    const { nome } = this.state;
    const { history } = this.props;

    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: nome });
        this.setState({ loading: false });
        history.push('/search');
        console.log(history);
      },
    );
  };

  render() {
    const { disabledButton, loading, redirect } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="name">
            <input
              data-testid="search-artist-input"
              type="text"
              name="name"
              onChange={ this.formButton }
              placeholder="Insira o nome do Artista ou os álbums de uma banda"
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disabledButton }
            onClick={ this.validState }
          >
            Pesquisar
          </button>
        </form>
        { loading && <Loading /> }
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Search;
