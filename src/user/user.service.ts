import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Student } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Student)
    private userRepository: Repository<Student>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No user found with id: ${id}`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No user found with id: ${id}`);
    }

    user.email = updateUserDto.email || user.email;
    user.name = updateUserDto.name || user.name;
    user.password = updateUserDto.password || user.password;
    user.lastName = updateUserDto.lastName || user.lastName;
    user.code = updateUserDto.code || user.code;



    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const userToRemove = await this.userRepository.findOne({ where: { id } });
    if (!userToRemove) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userRepository.remove(userToRemove);
  }
}
