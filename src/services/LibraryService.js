import BookRepository from '../repositories/BookRepository';
import AuthorRepository from '../repositories/AuthorRepository';
import UserRepository from '../repositories/UserRepository';
import AuditLogRepository from '../repositories/AuditLogRepository';

class LibraryService {
  constructor() {
    this.bookRepository = new BookRepository();
    this.authorRepository = new AuthorRepository();
    this.userRepository = new UserRepository();
    this.auditLogRepository = new AuditLogRepository();
  }

  async createBook(title, authorId) {
    const author = await this.authorRepository.findAuthorById(authorId);
    if (!author) throw new Error('Author not found');

    const book = { title, author };
    return await this.bookRepository.createBook(book);
  }

  async getBooks() {
    return await this.bookRepository.findAllBooks();
  }

  async createAuthor(name) {
    const author = { name };
    return await this.authorRepository.createAuthor(author);
  }

  async getAuthors() {
    return await this.authorRepository.findAllAuthors();
  }

  async createUser(name) {
    const user = { name };
    return await this.userRepository.createUser(user);
  }

  async getUsers() {
    return await this.userRepository.findAllUsers();
  }

  async borrowBook(bookId, userId) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new Error('User not found');
    if (user.borrowedBooksCount >= 3) throw new Error('User has reached the max borrow limit');

    const book = await this.bookRepository.findBookById(bookId);
    if (!book) throw new Error('Book not found');
    if (book.isBorrowed) throw new Error('Book already borrowed');

    book.isBorrowed = true;
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now
    user.borrowedBooksCount += 1;

    await this.bookRepository.updateBook(book);
    await this.userRepository.updateUser(user);

    await this.auditLogRepository.createLog({
      action: `User ${userId} borrowed book ${bookId}`,
      userId,
    });

    return book;
  }

  async returnBook(bookId, userId) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new Error('User not found');

    const book = await this.bookRepository.findBookById(bookId);
    if (!book) throw new Error('Book not found');
    if (!book.isBorrowed) throw new Error('Book is not borrowed');

    book.isBorrowed = false;
    book.dueDate = null;
    user.borrowedBooksCount -= 1;

    await this.bookRepository.updateBook(book);
    await this.userRepository.updateUser(user);

    await this.auditLogRepository.createLog({
      action: `User ${userId} returned book ${bookId}`,
      userId,
    });

    return book;
  }

  async getAuditLogs(filter = {}) {
    return await this.auditLogRepository.findLogs(filter);
  }
}

export default LibraryService;
