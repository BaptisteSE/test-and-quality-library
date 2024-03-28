/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { BookService } from './book.service';
import { Book, Category } from './schemas/book.schema';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
    let bookService: BookService;

    const createdBook = {
        _id: '124626',
        user: 'updatedUser',
        title: 'New Book',
        description: 'Book Description',
        author : 'Author',
        price: 100,
        category: Category.FANTASY
    };

    const updatedBook = {
      _id: '124626',
      user: 'updatedUser',
      title: 'Updated Book',
      description: 'Updated Description',
      author : 'Updated Author',
      price: 200,
      category: Category.CALSSICS
    };

    const mockDB = {
      create: jest.fn().mockResolvedValue(createdBook),
      find: jest.fn().mockResolvedValue([createdBook]),
      findById: jest.fn().mockResolvedValue(createdBook),
      findByIdAndDelete: jest.fn().mockResolvedValue(createdBook),
      updateById: jest.fn().mockResolvedValue(updatedBook),
      findByIdAndUpdate: jest.fn().mockResolvedValue(updatedBook)
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
    
    describe('getBook', () => {
      it('should return a single book by id', async () => {
          bookService = new BookService(mockDB as unknown as mongoose.Model<Book>);
  
          const result = await bookService.findById('124626');
  
          expect(result).toEqual(createdBook);
      });
  
      it('should throw NotFoundException if book is not found', async () => {
          mockDB.findById.mockResolvedValueOnce(null);
  
          bookService = new BookService(mockDB as unknown as mongoose.Model<Book>);
  
          await expect(bookService.findById('nonexistentid')).rejects.toThrow(NotFoundException);
      });
    });

    describe('deleteById', () => {
      it('should delete a book by id', async () => {
          bookService = new BookService(mockDB as unknown as mongoose.Model<Book>);

          const result = await bookService.deleteById('124626');

          expect(result).toEqual(createdBook);
          expect(mockDB.findByIdAndDelete).toHaveBeenCalledWith('124626');
      });
    });

    describe('updateById', () => {
      it('should update a book by id', async () => {
          const updatedInfo = {
              title: 'Updated Book',
              description: 'Updated Description', 
              author: 'Updated Author',
              price: 200,
              category: Category.CALSSICS
          };

          mockDB.findByIdAndUpdate = jest.fn().mockImplementation((id, book) => {
              return {
                  ...createdBook,
                  ...book,
                  _id: id
              };
          });

          bookService = new BookService(mockDB as unknown as mongoose.Model<Book>);

          const result = await bookService.updateById('124626', updatedInfo as Book);

          expect(result).toEqual(updatedBook);
      });
    });
  });
});