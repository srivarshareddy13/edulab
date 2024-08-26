import { EntitySchema } from 'typeorm';

const Book = new EntitySchema({
  name: 'Book',
  tableName: 'books',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    isBorrowed: {
      type: 'boolean',
      default: false,
    },
    dueDate: {
      type: 'date',
      nullable: true,
    },
  },
  relations: {
    author: {
      target: 'Author',
      type: 'many-to-one',
      joinColumn: true,
    },
  },
});

export default Book