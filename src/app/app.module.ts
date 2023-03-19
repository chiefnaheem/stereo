import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from 'src/media/media.module';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '#NAHeem199',
      database: 'stereo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
