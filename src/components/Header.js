import React from 'react';
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
        {loading ? <Loading /> : <p data-testid="header-user-name">{ usuario }</p>}
      </header>
    );
  }
}

export default Header;
