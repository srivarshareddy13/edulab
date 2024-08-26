import { EntitySchema } from 'typeorm';

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    borrowedBooksCount: {
      type: 'int',
      default: 0,
    },
  },
});

export default User