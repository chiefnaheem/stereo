import { Controller } from "@nestjs/common";
import { MediaService } from "../service/media.service";

@Controller('media')
export class MediaController {
    constructor(
        private readonly mediaService: MediaService
    ) {}
}