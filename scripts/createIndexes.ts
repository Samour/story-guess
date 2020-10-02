import { IndexOptions } from 'mongodb';
import { getManager } from '../be/servicesManager';

interface IndexSpec {
  collection: string;
  spec: any;
  options?: IndexOptions;
}

const indexes: IndexSpec[] = [
  {
    collection: 'User',
    spec: { loginId: 1 },
  },
  {
    collection: 'Role',
    spec: { name: 1 },
  },
  {
    collection: 'GuessItem',
    spec: { alternateNames: 'text' },
  },
];

const main = async () => {
  const db = await getManager().getDb();

  await Promise.all(indexes.map(async (idx) =>
    db.collection(idx.collection).createIndex(idx.spec, idx.options)
  ));

  await (await getManager().getMongoConnection()).close();
};

main().catch(console.log);
