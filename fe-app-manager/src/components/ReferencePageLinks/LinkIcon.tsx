import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});

interface IProps {
  iconSrc: string;
  href: string;
  alt: string;
}

export default function LinkIcon({ iconSrc, href, alt }: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={iconSrc} alt={alt} className={classes.icon} />
    </a>
  );
}
