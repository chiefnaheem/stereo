import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaController } from "./controller/media.controller";
import { Media } from "./entities/media.entities";
import { MediaService } from "./service/media.service";

@Module({
    imports: [TypeOrmModule.forFeature([Media])],
    controllers: [MediaController],
    providers: [MediaService],
  })
  export class MediaModule {}