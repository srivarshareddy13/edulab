import { EntitySchema } from 'typeorm';

const Author = new EntitySchema({
  name: 'Author',
  tableName: 'authors',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    books: {
      target: 'Book',
      type: 'one-to-many',
      inverseSide: 'author',
    },
  },
});

export default Author