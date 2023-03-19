import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaReturnDto, PaginationDto } from '../dto/media.dto';
import { Media } from '../entities/media.entities';
import {
  MediaParam,
  PaginationType,
  UpdateMediaParam,
} from '../types/media.types';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  // Create media object
  async create(media: MediaParam): Promise<Media> {
    try {
      this.logger.log(media);
      const newMedia = this.mediaRepository.create(media);
      return await this.mediaRepository.save(newMedia);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //get a paginated list of media objects
  async findAll(body: PaginationType): Promise<MediaReturnDto> {
    try {
      const { page, limit } = body;
      const skip = (page - 1) * limit;
      const [media, count] = await this.mediaRepository.findAndCount({
        order: { createdAt: 'DESC' },
        skip,
        take: limit,
      });
      const totalPages = Math.ceil(count / limit);
      return {
        count,
        limit,
        currentPage: page,
        totalPages,
        media,
      };
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
  async update(id: string, media: UpdateMediaParam): Promise<Media> {
    try {
      const mediaToUpdate = await this.mediaRepository.findOneOrFail({
        where: { id },
      });
      const updatedMedia = Object.assign(mediaToUpdate, media);
      return await this.mediaRepository.save(updatedMedia);
    } catch (error) {
      throw error;
    }
  }

  //Search media by title and description
  async search(search?: string): Promise<Media[]> {
    try {
      if (search) {
        return await this.mediaRepository.createQueryBuilder('media')
          .where('media.name LIKE :search', { search: `%${search}%` })
          .orWhere('media.description LIKE :search', { search: `%${search}%` })
          .getMany();
      } else {
        return await this.mediaRepository.find();
      }
    } catch (error) {
      throw error;
    }
  }
  

  //delete a media object
  async remove(id: string): Promise<Media> {
    try {
      const mediaToUpdate = await this.mediaRepository.findOneOrFail({
        where: { id },
      });
      mediaToUpdate.deletedAt = new Date(); // set the deletedAt field to the current timestamp
      return await this.mediaRepository.save(mediaToUpdate);
    } catch (error) {
      throw error;
    }
  }
}
