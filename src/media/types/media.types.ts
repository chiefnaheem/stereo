import { MediaStatusEnum, MediaTypeEnum } from "../enum/media.enum";

export type MediaType = {
    type: MediaTypeEnum;
    name: string;
    description?: string;
    url: string;
    status?: MediaStatusEnum;
};