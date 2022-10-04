import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        <div>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        </div>
        <div>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        </div>
        <div>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
        {loading ? <Loading /> : <p data-testid="header-user-name">{ usuario }</p>}
      </header>
    );
  }
}

export default Header;
