import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardsModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
})
export class AppModule {}
