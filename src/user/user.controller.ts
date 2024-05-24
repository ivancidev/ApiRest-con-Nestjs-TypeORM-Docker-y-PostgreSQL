import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'users were successfully obtained',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'User found successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'User found successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
  })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
