import React from 'react';
import Header from '../components/Header';
import '../styles/Favorites.css';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites" className="favoritos">
        <Header />
      </div>
    );
  }
}

export default Favorites;
