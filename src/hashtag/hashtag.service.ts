import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  public async createHashtag(createHashtagDto: CreateHashtagDto) {
    const hashtag = this.hashtagRepository.create(createHashtagDto);

    const savedHashtag = await this.hashtagRepository.save(hashtag);

    return {
      success: true,
      data: savedHashtag,
    };
  }

  public async findHashtags(hashtags?: number[]) {
    if (!hashtags || hashtags.length === 0) return [];

    return await this.hashtagRepository.find({
      where: {
        id: In(hashtags),
      },
    });
  }
}
