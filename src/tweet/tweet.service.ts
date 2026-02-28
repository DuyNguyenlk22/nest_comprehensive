import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async getTweets(userId: number) {
    return await this.tweetRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
        hashtags: true,
      },
    });
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    const user = await this.userService.findUserById(createTweetDto.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const hashtags = await this.hashtagService.findHashtags(
      createTweetDto.hashtags,
    );

    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user,
      hashtags,
    });

    await this.tweetRepository.save(tweet);

    return {
      success: true,
      message: 'Tweet created successfully',
      data: tweet,
    };
  }

  public async updateTweet(updateTweetDto: UpdateTweetDto) {
    const hashtags = await this.hashtagService.findHashtags(
      updateTweetDto.hashtags,
    );

    const tweet = await this.tweetRepository.findOneBy({
      id: updateTweetDto.id,
    });

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    tweet.text = updateTweetDto.text ?? tweet.text;
    tweet.image = updateTweetDto.image ?? tweet.image;
    tweet.hashtags = hashtags;

    const savedTweet = await this.tweetRepository.save(tweet);

    return {
      success: true,
      message: 'Tweet updated successfully',
      data: savedTweet,
    };
  }
}
