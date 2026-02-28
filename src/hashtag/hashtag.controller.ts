import { Body, Controller, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(public readonly hashtagService: HashtagService) {}

  @Post()
  public async createHashtag(@Body() hashtagBody: CreateHashtagDto) {
    return await this.hashtagService.createHashtag(hashtagBody);
  }
}
