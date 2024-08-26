const { getRepository } = require('typeorm');
import Author from '../entities/Author';

class AuthorRepository {
  constructor() {
    this.repo = getRepository(Author);
  }

  async createAuthor(author) {
    return await this.repo.save(author);
  }

  async findAuthorById(authorId) {
    return await this.repo.findOne(authorId);
  }

  async findAllAuthors() {
    return await this.repo.find();
  }
}

export default AuthorRepository;
