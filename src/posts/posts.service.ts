import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createPostDto.userId },
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', 404);
    }
    return this.prisma.post.create({
      data: createPostDto,
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    if (!post) {
      throw new HttpException('Post não encontrado', 404);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);
    if (updatePostDto.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: updatePostDto.userId },
      });
      if (!user) {
        throw new HttpException('Usuário não encontrado', 404);
      }
    }
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.post.delete({ where: { id } });
  }
}
