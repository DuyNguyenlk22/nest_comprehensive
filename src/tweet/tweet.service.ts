import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly userService: UserService) {}

  tweets: { text: string; userId: number; date: Date }[] = [
    { text: 'Hello World', userId: 1, date: new Date() },
    { text: 'NestJS is awesome!', userId: 2, date: new Date() },
    { text: 'I love programming', userId: 1, date: new Date() },
  ];

  getTweets(userId: number) {
    const user = this.userService.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const tweetsByUser = this.tweets
      .filter((tweet) => tweet.userId === userId)
      .map((tweet) => ({
        ...tweet,
        user,
      }));
    return [...tweetsByUser];
  }
}
