import { MediaStatusEnum, MediaTypeEnum } from '../enum/media.enum';

export type MediaParam = {
  type: MediaTypeEnum;
  name: string;
  description?: string;
  url: string;
  status?: MediaStatusEnum;
};

export type UpdateMediaParam = Partial<MediaParam>;

export type PaginationType = {
    page: number;
    limit: number;
};
