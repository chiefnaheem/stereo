import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaReturnDto, PaginationDto } from '../dto/media.dto';
import { Media } from '../entities/media.entities';
import { MediaType, PaginationType, UpdateMediaType } from '../types/media.types';

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
  async findAll(body: PaginationType): Promise<MediaReturnDto> {
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
  async update(id: string, media: UpdateMediaType): Promise<Media> {
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
      const query = {};
      if (search) {
        // Search by title and description and be case insensitive
        query['name'] = { $regex: search, $options: 'i' };
        query['description'] = { $regex: search, $options: 'i' };
      }

      return await this.mediaRepository.find({
        where: query,
      });
    } catch (error) {
      throw error;
    }
  }

  //delete a media object
  async delete(id: string): Promise<Media> {
    try {
      const mediaToDelete = await this.mediaRepository.findOneOrFail({
        where: { id },
      });
      return await this.mediaRepository.remove(mediaToDelete);
    } catch (error) {
      throw error;
    }
  }
}
