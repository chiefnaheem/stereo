import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  MediaDto,
  PaginationDto,
  UpdateMediaDto,
} from 'src/media/dto/media.dto';
import { MediaService } from '../service/media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // Create media object

  @Post()
  async create(@Body() media: MediaDto) {
    try {
      console.log(media);
      const newMedia = await this.mediaService.create(media);
      return {
        statusCode: HttpStatus.CREATED,
        status: 'success',
        message: 'Media created successfully',
        data: newMedia,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        status: 'error',
        message: error.message,
      };
    }
  }

  @Get('search')
  async search(@Query('search') search?: string) {
    try {
      const media = await this.mediaService.search(search);
      return {
        status: 'success',
        message: 'Media fetched successfully',
        data: media,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  //get a paginated list of media objects
  @Get()
  async findAll(@Query() body: PaginationDto) {
    try {
      const media = await this.mediaService.findAll(body);
      return {
        status: 'success',
        message: 'Media fetched successfully',
        data: media,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  //get a single media object
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      const media = await this.mediaService.findOne(id);
      return {
        status: 'success',
        message: 'Media fetched successfully',
        data: media,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  //update a media object
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateMediaDto) {
    try {
      const media = await this.mediaService.update(id, body);
      return {
        status: 'success',
        message: 'Media updated successfully',
        data: media,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  //delete a media object
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    try {
      const media = await this.mediaService.remove(id);
      return {
        status: 'success',
        message: 'Media deleted successfully',
        data: media,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  //search for a media object
 
}
