/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { BookService } from './book.service';
import { Book, Category } from './schemas/book.schema';

describe('BookService', () => {
    let bookService: BookService;

    const createdBook = {
        _id: '124626',
        user: 'zzgrjgiods,vp',
        title: 'New Book',
        description: 'Book Description',
        author : 'Author',
        price: 100,
        category: Category.FANTASY
    };

    const mockDB = {
        create: jest.fn().mockResolvedValue(createdBook),
        find: jest.fn().mockResolvedValue([createdBook])
    }

    describe('create', () => {
        it('should create and return a book', async () => {
            const newBook = {
                title: 'Arsène Lupin',
                description: 'Gentleman cambrioleur', 
                author: 'Maurice LeBlanc',
                price: 10,
                category: Category.ADVENTURE
            }
            bookService = new BookService(mockDB as unknown as mongoose.Model<Book>);

            const result = await bookService.create(newBook as Book);

            expect(result).toEqual(createdBook)
        });
    });

    describe('findAll', () => {
      it('should return an array of books', async () => {
          bookService = new BookService(mockDB as unknown as mongoose.Model<Book>);

          const result = await bookService.findAll();

          expect(result).toEqual([createdBook]);
      });
  });
});