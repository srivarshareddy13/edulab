const { getRepository } = require('typeorm');
import Book from '../entities/Book';

class BookRepository {
  constructor() {
    this.repo = getRepository(Book);
  }

  async createBook(book) {
    return await this.repo.save(book);
  }

  async findBookById(bookId) {
    return await this.repo.findOne(bookId, { relations: ['author'] });
  }

  async updateBook(book) {
    return await this.repo.save(book);
  }

  async deleteBook(bookId) {
    return await this.repo.delete(bookId);
  }

  async findAllBooks() {
    return await this.repo.find({ relations: ['author'] });
  }
}

export default BookRepository;
