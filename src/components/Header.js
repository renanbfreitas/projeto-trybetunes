import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Loading.css';

class Header extends React.Component {
  state = {
    loading: true,
    usuario: '',
  };

  async componentDidMount() {
    const data = await getUser();
    this.setState({
      loading: false,
      usuario: data.name,
    });
  }

  render() {
    const { loading, usuario } = this.state;
    return (
      <header data-testid="header-component" className="pesquisa">
        <div>
          <Link
            to="/search"
            data-testid="link-to-search"
            className="pesquisa"
          >
            Pesquisa
          </Link>
        </div>
        <div className="favoritos">
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="favoritos"
          >
            Favoritos
          </Link>
        </div>
        <div>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="perfil"
          >
            Perfil
          </Link>
        </div>
        {loading ? <Loading />
          : <p data-testid="header-user-name" className="nameUsuario">{ usuario }</p>}
      </header>
    );
  }
}

export default Header;
