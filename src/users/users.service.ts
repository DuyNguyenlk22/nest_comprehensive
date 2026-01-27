import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  users: {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    isMarried: boolean;
    password: string;
  }[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      gender: 'male',
      isMarried: true,
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 25,
      gender: 'female',
      isMarried: false,
      password: 'mypassword',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      age: 40,
      gender: 'male',
      isMarried: true,
      password: 'securepass',
    },
  ];

  getAllUsers() {
    const isAuthenticated = this.authService.isAuthenticated;

    if (!isAuthenticated) {
      return 'User is not authenticated';
    }

    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    isMarried: boolean;
    password: string;
  }) {
    this.users.push({ ...user });
  }
}
