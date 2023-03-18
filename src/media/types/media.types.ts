import { MediaStatusEnum, MediaTypeEnum } from '../enum/media.enum';

export type MediaType = {
  type: MediaTypeEnum;
  name: string;
  description?: string;
  url: string;
  status?: MediaStatusEnum;
};

export type UpdateMediaType = Partial<MediaType> & { id: string };