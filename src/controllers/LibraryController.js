const express = require('express');
import LibraryService from '../services/LibraryService';
const router = express.Router();
const libraryService = new LibraryService();

// Book Routes
router.post('/books', async (req, res) => {
  try {
    const { title, authorId } = req.body;
    const book = await libraryService.createBook(title, authorId);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); 

router.get('/books', async (req, res) => {
  try {
    const books = await libraryService.getBooks();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Author Routes
router.post('/authors', async (req, res) => {
  try {
    const { name } = req.body;
    const author = await libraryService.createAuthor(name);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/authors', async (req, res) => {
  try {
    const authors = await libraryService.getAuthors();
    res.json(authors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Routes
router.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    const user = await libraryService.createUser(name);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await libraryService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Borrow/Return Book Routes
router.post('/books/borrow', async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const book = await libraryService.borrowBook(bookId, userId);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/books/return', async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const book = await libraryService.returnBook(bookId, userId);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Audit Logs Routes
router.get('/audit-logs', async (req, res) => {
  try {
    const { userId } = req.query;
    const logs = await libraryService.getAuditLogs(userId ? { userId } : {});
    res.json(logs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
