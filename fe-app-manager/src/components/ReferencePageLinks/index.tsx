import React from 'react';
import { connect } from 'react-redux';
import { sprintf } from 'sprintf-js';
import { makeStyles } from '@material-ui/core';
import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { IState } from '../../state';
import LinkIcon from './LinkIcon';

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    top: 150,
    right: 50,
    display: 'flex',
    flexDirection: 'column',
  },
});

interface ILinkProfile {
  href: string;
  imgSrc: string;
  alt: string;
}

interface ICState {
  profiles: ILinkProfile[];
}

const mapState = (state: IState): ICState => ({
  profiles: state.config.referenceLinks.profiles
    .filter(({ validCategories }) => validCategories.includes(state.guessItemView.item?.category as Category))
    .map(({ searchLocation, imgSrc, alt }) => ({
      href: sprintf(searchLocation, state.guessItemView.item?.title),
      imgSrc,
      alt,
    })),
});

function ReferencePageLinks({ profiles }: ICState): JSX.Element {
  const classes = useStyles();

  const links = profiles.map(({ href, imgSrc, alt }) => <LinkIcon key={alt} href={href} iconSrc={imgSrc} alt={alt} />);

  return (
    <div className={classes.container}>
      {links}
    </div>
  );
}

export default connect(mapState)(ReferencePageLinks);
