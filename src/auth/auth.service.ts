import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  isAuthenticated: boolean = false;

  login(email: string, password: string) {
    const user = this.userService.users.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      this.isAuthenticated = true;
      return 'USER_TOKEN';
    }

    return 'USER DOES NOT EXIST';
  }
}
