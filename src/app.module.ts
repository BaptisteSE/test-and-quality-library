import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BookSchema } from './book/schemas/book.schema';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://root:root@cluster0.exnhxlc.mongodb.net/dkt?retryWrites=true&w=majority'), 
            MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
            BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
