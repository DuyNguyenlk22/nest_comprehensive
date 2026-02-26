import { Body, Controller, Get, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get('{/:userId}')
  public getTweets() {
    return '';
  }

  @Post()
  public createTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetService.createTweet(tweet);
  }
}
