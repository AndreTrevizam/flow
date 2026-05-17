import { Injectable } from '@nestjs/common';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Board } from './models/board.model';

@Injectable()
export class BoardsService {
  constructor(private prismaService: PrismaService) {}

  async create(createBoardInput: CreateBoardInput): Promise<Board> {
    return await this.prismaService.board.create({
      data: {
        ...createBoardInput,
      },
      include: {
        users: true,
        columns: { include: { tasks: true } },
      },
    });
  }

  findAll() {
    return `This action returns all boards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardInput: UpdateBoardInput) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
