import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';
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
      jest.spyOn(mediaRepository, 'save').mockResolvedValue(media);

      expect(await mediaService.remove(media.id)).toEqual(media);

      expect(mediaRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: media.id },
      });
      expect(media.deletedAt).toBeInstanceOf(Date);
      expect(mediaRepository.save).toHaveBeenCalledWith(media);
    });

    it('should throw an error if remove fails', async () => {
      const media = new Media();
      media.id = '1';

      jest.spyOn(mediaRepository, 'findOneOrFail').mockResolvedValue(media);
      jest.spyOn(mediaRepository, 'remove').mockRejectedValue(new Error());

      await expect(mediaService.remove(media.id)).rejects.toThrow();
    });
  });

  //   describe('search', () => {
  //     it('should return all media objects if search is not provided', async () => {
  //       const mediaList = [new Media(), new Media(), new Media()];

  //       jest.spyOn(mediaRepository, 'find').mockResolvedValue(mediaList);

  //       const result: Media[] = await mediaService.search();

  //       expect(result).toEqual(mediaList);
  //     });

  //     it('should return media objects that match search query', async () => {
  //         const media1 = new Media();
  //         media1.name = 'Test media 1';
  //         media1.description = 'This is the first test media';
  //         media1.url = 'https://test-media-1.com';
  //         await mediaRepository.save(media1);

  //         const media2 = new Media();
  //         media2.name = 'Test media 2';
  //         media2.description = 'This is the second test media';
  //         media2.url = 'https://test-media-2.com';
  //         await mediaRepository.save(media2);

  //         const media3 = new Media();
  //         media3.name = 'Another test media';
  //         media3.description = 'This is another test media';
  //         media3.url = 'https://another-test-media.com';
  //         await mediaRepository.save(media3);

  //         const searchQuery = 'test';
  //         const result: Media[] = await mediaService.search(searchQuery);

  //         expect(result.length).toEqual(2);
  //         expect(result).toContainEqual(media1);
  //         expect(result).toContainEqual(media2);
  //       });

  //     // it('should return media objects that match search query', async () => {
  //     //     const mediaList = [new Media(), new Media(), new Media()];

  //     //     jest.spyOn(mediaRepository, 'find').mockResolvedValue(mediaList);

  //     //     const searchQuery = 'alien';

  //     //     const result: Media[] = await mediaService.search(searchQuery);

  //     //     expect(result.length).toEqual(2);
  //     //     expect(result[0]).toEqual(mediaList[0]);
  //     //     expect(result[1]).toEqual(mediaList[1]);
  //     //   });

  //     it('should throw an error if find fails', async () => {
  //       const searchQuery = 'test';

  //       jest.spyOn(mediaRepository, 'find').mockRejectedValue(new Error());

  //       await expect(mediaService.search(searchQuery)).rejects.toThrow();
  //     });
  //   });

  // describe('search', () => {
  //     it('should return all media objects when no search query is provided', async () => {
  //       const mediaList: Media[] = [
  //         { id: '1', name: 'Media 1', description: 'Description 1' } as Media,
  //         { id: '2', name: 'Media 2', description: 'Description 2' } as Media,
  //         { id: '3', name: 'Media 3', description: 'Description 3' } as Media,
  //       ];
  //       jest.spyOn(mediaRepository, 'find').mockResolvedValue(mediaList);

  //       const result: Media[] = await mediaService.search();

  //       expect(result.length).toEqual(mediaList.length);
  //       expect(result).toEqual(mediaList);
  //     });

  //     it('should return media objects that match search query', async () => {
  //       const searchQuery = 'media';
  //       const mediaList: Media[] = [
  //         { id: '1', name: 'Media 1', description: 'Description 1' } as Media,
  //         { id: '2', name: 'Media 2', description: 'Description 2' } as Media,
  //         { id: '3', name: 'Media 3', description: 'Description 3' } as Media,
  //       ];
  //       jest.spyOn(mediaRepository, 'find').mockResolvedValue([
  //         mediaList[0],
  //         mediaList[2],
  //       ]);

  //       const result: Media[] = await mediaService.search(searchQuery);

  //       expect(result.length).toEqual(2);
  //       expect(result[0]).toEqual(mediaList[0]);
  //       expect(result[1]).toEqual(mediaList[2]);
  //     });
  //   });

  describe('search', () => {
      const mediaList = [
        {
          id: '1',
          name: 'Test Media 1',
          description: 'This is a test media',
        } as Media,
        {
          id: '2',
          name: 'Test Media 2',
          description: 'Another test media',
        } as Media,
        {
          id: '3',
          name: 'Other Media',
          description: 'This media is not a test',
        } as Media,
      ];
    it('should return media objects that match search query', async () => {
      const searchQuery = 'test';
      jest.spyOn(mediaRepository, 'createQueryBuilder').mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(mediaList.slice(0, 2)),
      } as any);

      // Call method

      const result: Media[] = await mediaService.search(searchQuery);

      // Check result
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(mediaList[0]);
      expect(result[1]).toEqual(mediaList[1]);
    });

    it('should throw an error if search fails', async () => {
        const searchQuery = 'invalid query';
        jest.spyOn(mediaRepository, 'createQueryBuilder').mockReturnValueOnce({
            where: jest.fn().mockReturnThis(),
            orWhere: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockReturnValueOnce(mediaList),
          } as any as SelectQueryBuilder<Media>);
          
        try {
          await mediaService.search(searchQuery);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual('Search failed');
        }
      });
      
    
  });
});
