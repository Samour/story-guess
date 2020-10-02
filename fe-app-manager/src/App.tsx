import React from 'react';
import { Container } from '@material-ui/core';
import GuessItemsList from './components/GuessItemsList';

export default function App(): JSX.Element {
  return (
    <Container maxWidth="md">
      <GuessItemsList />
    </Container>
  );
}
