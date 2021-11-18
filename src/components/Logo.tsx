import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';

export default function Logo(): ReactElement {
  return (
    <Link className="logo-wrapper" to="/journals">
      <img className="logo" src={logo} alt="Nocturnal" />
    </Link>
  );
}
