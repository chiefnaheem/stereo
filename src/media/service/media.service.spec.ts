// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { MediaService } from './media.service';
// import { Media } from '../entities/media.entities';
// import { MediaParam, PaginationType, UpdateMediaParam } from '../types/media.types';
// import { MediaStatusEnum, MediaTypeEnum } from '../enum/media.enum';

// describe('MediaService', () => {
//   let service: MediaService;
//   let mediaRepository: Repository<Media>;

//   const mockMedia = [
//     {
//       id: '1',
//       name: 'Mock Media 1',
//       description: 'This is mock media 1',
//       createdAt: new Date('2022-01-01'),
//       type: MediaTypeEnum.AUDIO,
//       status: MediaStatusEnum.ACTIVE,
//       url: 'https://www.youtube.com/watch?v=1',
//       updatedAt: new Date('2022-01-02'),
//       deletedAt: null,
//     },
//     {
//       id: '2',
//       name: 'Mock Media 2',
//       description: 'This is mock media 2',
//       type: MediaTypeEnum.AUDIO,
//       status: MediaStatusEnum.ACTIVE,
//       url: 'https://www.youtube.com/watch?v=1',
//       createdAt: new Date('2022-01-02'),
//       updatedAt: new Date('2022-01-03'),
//       deletedAt: null,
//     },
//   ];

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         MediaService,
//         {
//           provide: getRepositoryToken(Media),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     service = module.get<MediaService>(MediaService);
//     mediaRepository = module.get<Repository<Media>>(getRepositoryToken(Media));
//   });

//   describe('create', () => {
//     it('should create and return a media object', async () => {
//       jest.spyOn(mediaRepository, 'create').mockReturnValue(mockMedia[0] as Media);
//       jest.spyOn(mediaRepository, 'save').mockResolvedValue(mockMedia[0] as Media);

//       const newMedia: MediaParam = {
//         name: 'New Media',
//         description: 'This is a new media object',
//         type: MediaTypeEnum.AUDIO,
//         url: 'https://www.youtube.com/watch?v=1',
//       };
//       const result = await service.create(newMedia);
//       expect(result).toEqual(mockMedia[0]);
//     });

//     it('should throw an error if there is an error in creating the media object', async () => {
//       const errorMessage = 'Error in creating media object';
//       jest.spyOn(mediaRepository, 'create').mockImplementation(() => {
//         throw new Error(errorMessage);
//       });

//       const newMedia: MediaParam = {
//         name: 'New Media',
//         description: 'This is a new media object',
//         type: MediaTypeEnum.AUDIO,
//         url: 'https://www.youtube.com/watch?v=1',
//       };
//       await expect(service.create(newMedia)).rejects.toThrowError(errorMessage);
//     });
//   });

//   describe('findAll', () => {
//     it('should return a paginated list of media objects', async () => {
//       jest.spyOn(mediaRepository, 'findAndCount').mockResolvedValue([mockMedia, mockMedia.length]);
//       const pagination: PaginationType = {
//         page: 1,
//         limit: 10,
//       };
//       const result = await service.findAll(pagination);
//       expect(result).toEqual({
//         count: mockMedia.length,
//         limit: pagination.limit,
//         currentPage: pagination.page,
//         totalPages: 1,
//         media: mockMedia,
//       });
//     });

//     it('should throw an error if there is an error in finding the media objects', async () => {
//       const errorMessage = 'Error in finding media objects';
//       jest.spyOn(mediaRepository, 'findAndCount').mockImplementation(() => {
//         throw new Error(errorMessage);
//       });

//       const pagination: PaginationType = {
//         page: 1,
//         limit: 10,
//       };
//       await expect(service.findAll(pagination)).rejects.toThrowError(errorMessage))
//         expect(mediaRepository.findAndCount).toHaveBeenCalledTimes(1);
//         expect(mediaRepository.findAndCount).toHaveBeenCalledWith({
//           order: { createdAt: 'DESC' },
//           skip: 0,
//           take: 10,
//         });
//       });

//       it('should throw an error if there is an error in finding a single media object', async () => {
//         const errorMessage = 'Error in finding media object';
//         jest.spyOn(mediaRepository, 'findOneOrFail').mockImplementation(() => {
//           throw new Error(errorMessage);
//         });

//         const id = '1';
//         await expect(service.findOne(id)).rejects.toThrowError(errorMessage);

//         expect(mediaRepository.findOneOrFail).toHaveBeenCalledTimes(1);
//         expect(mediaRepository.findOneOrFail).toHaveBeenCalledWith({ where: { id } });
//       });

//       it('should throw an error if there is an error in updating a media object', async () => {
//         const errorMessage = 'Error in updating media object';
//         jest.spyOn(mediaRepository, 'findOneOrFail').mockImplementation(() => {
//           throw new Error(errorMessage);
//         });

//         const id = '1';
//         const updateMedia: UpdateMediaParam = {
//           name: 'Updated Name',
//           description: 'Updated Description',
//         };
//         await expect(service.update(id, updateMedia)).rejects.toThrowError(errorMessage);

//         expect(mediaRepository.findOneOrFail).toHaveBeenCalledTimes(1);
//         expect(mediaRepository.findOneOrFail).toHaveBeenCalledWith({ where: { id } });
//       });

//       it('should throw an error if there is an error in searching media objects', async () => {
//         const errorMessage = 'Error in searching media objects';
//         jest.spyOn(mediaRepository, 'find').mockImplementation(() => {
//           throw new Error(errorMessage);
//         });

//         const search = 'search';
//         await expect(service.search(search)).rejects.toThrowError(errorMessage);

//         expect(mediaRepository.find).toHaveBeenCalledTimes(1);
//         expect(mediaRepository.find).toHaveBeenCalledWith({
//           where: {
//             name: { $regex: search, $options: 'i' },
//             description: { $regex: search, $options: 'i' },
//           },
//         });
//       });

//       it('should throw an error if there is an error in deleting a media object', async () => {
//         const errorMessage = 'Error in deleting media object';
//         jest.spyOn(mediaRepository, 'findOneOrFail').mockImplementation(() => {
//           throw new Error(errorMessage);
//         });

//         const id = '1';
//         await expect(service.remove(id)).rejects.toThrowError(errorMessage);

//         expect(mediaRepository.findOneOrFail).toHaveBeenCalledTimes(1);
//         expect(mediaRepository.findOneOrFail).toHaveBeenCalledWith({ where: { id } });
//       });
//     });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { MediaService } from './media.service';
import { Media } from '../entities/media.entities';
import {
  MediaParam,
  PaginationType,
  UpdateMediaParam,
} from '../types/media.types';
import { MediaReturnDto } from '../dto/media.dto';
import { MediaStatusEnum, MediaTypeEnum } from '../enum/media.enum';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MediaService', () => {
  let mediaService: MediaService;
  let mediaRepository: Repository<Media>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: getRepositoryToken(Media),
          useClass: Repository,
        },
      ],
    }).compile();

    mediaService = moduleRef.get<MediaService>(MediaService);
    mediaRepository = moduleRef.get<Repository<Media>>(
      getRepositoryToken(Media),
    );
  });

  describe('create', () => {
    it('should create a new media object', async () => {
      const media: MediaParam = {
        name: 'Test Media',
        description: 'A test media object',
        type: MediaTypeEnum.IMAGE,
        url: 'http://test.com/test.jpg',
      };

      const createdMedia = new Media();
      Object.assign(createdMedia, media);

      jest.spyOn(mediaRepository, 'create').mockReturnValue(createdMedia);
      jest.spyOn(mediaRepository, 'save').mockResolvedValue(createdMedia);

      expect(await mediaService.create(media)).toEqual(createdMedia);
    });

    it('should throw an error if creation fails', async () => {
      const media = {
        id: '1',
        name: 'Test Media',
        description: 'A test media object',
        type: MediaTypeEnum.IMAGE,
        url: 'http://test.com/test.jpg',
        status: MediaStatusEnum.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(mediaRepository, 'create').mockReturnValue(media);
      jest.spyOn(mediaRepository, 'save').mockRejectedValue(new Error());

      await expect(mediaService.create(media)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of media objects', async () => {
      const pagination: PaginationType = {
        page: 1,
        limit: 10,
      };

      const mediaList = [new Media(), new Media(), new Media()];

      jest
        .spyOn(mediaRepository, 'findAndCount')
        .mockResolvedValue([mediaList, mediaList.length]);

      const result: MediaReturnDto = await mediaService.findAll(pagination);

      expect(result.count).toEqual(mediaList.length);
      expect(result.limit).toEqual(pagination.limit);
      expect(result.currentPage).toEqual(pagination.page);
      expect(result.totalPages).toEqual(
        Math.ceil(mediaList.length / pagination.limit),
      );
      expect(result.media).toEqual(mediaList);
    });

    it('should throw an error if find and count fails', async () => {
      const pagination: PaginationType = {
        page: 1,
        limit: 10,
      };

      jest
        .spyOn(mediaRepository, 'findAndCount')
        .mockRejectedValue(new Error());

      await expect(mediaService.findAll(pagination)).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a single media object', async () => {
      const media = new Media();
      media.id = '1';

      jest.spyOn(mediaRepository, 'findOneOrFail').mockResolvedValue(media);

      expect(await mediaService.findOne(media.id)).toEqual(media);
    });

    it('should throw an error if findOneOrFail fails', async () => {
      const media = new Media();
      media.id = '1';

      jest
        .spyOn(mediaRepository, 'findOneOrFail')
        .mockRejectedValue(new Error());

      await expect(mediaService.findOne(media.id)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a media object', async () => {
      const updateData: UpdateMediaParam = {
        name: 'Updated Media',
        description: 'An updated media object',
      };
      const media = new Media();
      media.id = '1';
      media.name = 'Test Media';
      media.description = 'A test media object';
      media.type = MediaTypeEnum.AUDIO;
      media.url = 'http://test.com/test.jpg';

      const updatedMedia = new Media();
      Object.assign(updatedMedia, media, updateData);

      jest.spyOn(mediaRepository, 'findOneOrFail').mockResolvedValue(media);
      jest.spyOn(mediaRepository, 'save').mockResolvedValue(updatedMedia);

      expect(await mediaService.update(media.id, updateData)).toEqual(
        updatedMedia,
      );
    });

    it('should throw an error if update fails', async () => {
      const updateData: UpdateMediaParam = {
        name: 'Updated Media',
        description: 'An updated media object',
      };

      const media = new Media();
      media.id = '1';
      media.name = 'Test Media';
      media.description = 'A test media object';
      media.type = MediaTypeEnum.AUDIO;
      media.url = 'http://test.com/test.jpg';

      jest.spyOn(mediaRepository, 'findOneOrFail').mockResolvedValue(media);
      jest.spyOn(mediaRepository, 'save').mockRejectedValue(new Error());

      await expect(mediaService.update(media.id, updateData)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a media object', async () => {
      const media = new Media();
      media.id = '1';

      jest.spyOn(mediaRepository, 'findOneOrFail').mockResolvedValue(media);
      jest.spyOn(mediaRepository, 'remove').mockResolvedValue(media);

      expect(await mediaService.remove(media.id)).toEqual(media);
    });

    it('should throw an error if remove fails', async () => {
      const media = new Media();
      media.id = '1';

      jest.spyOn(mediaRepository, 'findOneOrFail').mockResolvedValue(media);
      jest.spyOn(mediaRepository, 'remove').mockRejectedValue(new Error());

      await expect(mediaService.remove(media.id)).rejects.toThrow();
    });
  });
});
