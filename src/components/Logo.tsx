import React, { ReactElement } from 'react';

import logo from '../assets/logo.svg';

export default function Logo(): ReactElement {
  return <img className="logo" src={logo} alt="Nocturnal" />;
}
