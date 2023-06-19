import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  getAllBoards(user: User): Promise<Board[]> {
    return this.boardRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return board;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  deleteBoard(id: number, user: User): Promise<void> {
    return this.boardRepository.deleteBoard(id, user);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
