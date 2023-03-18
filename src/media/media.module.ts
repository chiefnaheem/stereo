import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "./entities/media.entities";

@Module({
    imports: [TypeOrmModule.forFeature([Media])],
    providers: []
  })
  export class MediaModule {}