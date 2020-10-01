export interface IConfig {
  server: {
    port: number;
  };
  db: {
    url: string;
    db: string;
  };
  passwordHashRounds: number;
}

export const config: IConfig = {
  server: {
    port: 8080,
  },
  db: {
    url: 'mongodb://localhost:27017',
    db: 'story-guess-local',
  },
  passwordHashRounds: 10,
};
