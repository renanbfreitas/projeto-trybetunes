import React from 'react';
import Header from '../components/Header';
import '../styles/Profile.css';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile" className="perfil">
        <Header />
      </div>
    );
  }
}

export default Profile;
