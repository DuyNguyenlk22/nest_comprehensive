import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  users: {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    isMarried: boolean;
  }[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      gender: 'male',
      isMarried: true,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 25,
      gender: 'female',
      isMarried: false,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      age: 40,
      gender: 'male',
      isMarried: true,
    },
  ];

  getAllUsers() {
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
  }) {
    this.users.push({ ...user });
  }
}
