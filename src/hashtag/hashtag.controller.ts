import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(public readonly hashtagService: HashtagService) {}

  @Post()
  public async createHashtag(@Body() hashtagBody: CreateHashtagDto) {
    return await this.hashtagService.createHashtag(hashtagBody);
  }

  @Delete(':id')
  public async DeleteHashtag(@Param('id', ParseIntPipe) id: number) {
    return await this.hashtagService.deleteHashtag(id);
  }

  @Delete('soft-delete/:id')
  public async SoftDeleteHashtag(@Param('id', ParseIntPipe) id: number) {
    return await this.hashtagService.softDeleteHashtag(id);
  }
}
