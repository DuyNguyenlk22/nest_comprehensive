import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async createTweet(createTweetDto: CreateTweetDto) {
    const user = await this.userService.findUserById(createTweetDto.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user,
    });

    await this.tweetRepository.save(tweet);

    return {
      success: true,
      message: 'Tweet created successfully',
      data: tweet,
    };
  }
}
