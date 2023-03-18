import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaReturnDto, PaginationDto } from '../dto/media.dto';
import { Media } from '../entities/media.entities';
import { MediaType, UpdateMediaType } from '../types/media.types';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  // Create media object
  async create(media: MediaType): Promise<Media> {
    try {
      const newMedia = this.mediaRepository.create(media);
      return await this.mediaRepository.save(newMedia);
    } catch (error) {
      throw error;
    }
  }

  //get a paginated list of media objects
  async findAll(body?: PaginationDto): Promise<MediaReturnDto> {
    try {
      const { page, limit } = body;
      const [data, count] = await this.mediaRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });
      const totalPages = Math.ceil(count / limit);
      return { data, count, limit, currentPage: page, totalPages };
    } catch (error) {
      throw error;
    }
  }

  //get a single media object
  async findOne(id: string): Promise<Media> {
    try {
      return await this.mediaRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  //update a media object
    async update(body: UpdateMediaType): Promise<Media> {
    try {
        const { id, ...media } = body;
      const mediaToUpdate = await this.mediaRepository.findOneOrFail({
        where: { id },
      });
      const updatedMedia = Object.assign(mediaToUpdate, media);
      return await this.mediaRepository.save(updatedMedia);
    } catch (error) {
      throw error;
    }
}
}
