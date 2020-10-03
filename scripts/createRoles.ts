import { v4 as uuid } from 'uuid';
import { IRole } from '../be/model/Role';
import { getManager } from '../be/servicesManager';

const roles = [
  {
    name: 'MANAGE_QUIZ_DB',
    permissions: [
      'readGuessItemData',
      'createGuessItem',
      'updateGuessItem',
    ],
  },
];

const main = async () => {
  const collection = (await getManager().getDb()).collection('Role');
  await Promise.all(roles.map(async (r) => {
    const role: IRole = await collection.findOne({ name: r.name });
    if (role) {
      await collection.updateOne({ _id: role._id }, {
        $set: {
          permissions: r.permissions, updatedAt: new Date(),
        },
      });
    } else {
      const now = new Date();
      await collection.insertOne({
        _id: uuid(),
        name: r.name,
        permissions: r.permissions,
        createdAt: now,
        updatedAt: now,
      });
    }
  }));

  await (await getManager().getMongoConnection()).close();
};

main().catch(console.log);
