import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user-dto.input';
import { hash } from 'bcrypt';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findUnique(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(data: CreateUserInput): Promise<User> {
    const encryptedPassword = await hash(data.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
        password: encryptedPassword,
      },
    });

    return user;
  }
}
