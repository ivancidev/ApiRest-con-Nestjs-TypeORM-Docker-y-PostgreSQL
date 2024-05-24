import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Student } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/common/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Student)
    private userRepository: Repository<Student>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const isAlreadyExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (isAlreadyExist) {
      throw new HttpException(
        'Email already registered',
        HttpStatus.UNAUTHORIZED, //buscar otra opcion
      );
    }

    try {
      const hashedPassword = encodePassword(createUserDto.password);
      const newUser = await this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      if (!newUser) {
        throw new Error('Failed to create user');
      }
      return this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await this.userRepository.find({ withDeleted: true });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['accessLog'] });

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
    // user.accessLog.map() si no funciona con cascade aplicar este metodo

    user.email = updateUserDto.email || user.email;
    user.name = updateUserDto.name || user.name;
    user.password = updateUserDto.password || user.password;
    user.lastName = updateUserDto.lastName || user.lastName;
    user.code = updateUserDto.code || user.code;

    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found with email: ${email}`);
    }

    return user;
  }

  async remove(id: string) {
    return await this.userRepository.softDelete(id);
  }
}
