import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';

class Login extends React.Component {
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
    const validButton = 3;
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
      <div data-testid="page-login">
        <form>
          <div>
            <h1 className="trybeName">TrybeTunes</h1>
            <label htmlFor="name" className="name">
              <input
                className="name"
                data-testid="login-name-input"
                type="text"
                name="name"
                onChange={ this.formButton }
                placeholder="Insira seu nome"
              />
            </label>
          </div>
          <div className="buttonEntrar">
            <button
              className="buttonEntrar"
              data-testid="login-submit-button"
              type="button"
              disabled={ disabledButton }
              onClick={ this.validState }
            >
              Entrar
            </button>
          </div>
        </form>
        { loading && <Loading /> }
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
