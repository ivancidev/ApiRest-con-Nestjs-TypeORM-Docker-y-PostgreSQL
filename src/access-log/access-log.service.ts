import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccessLogDto } from './dto/create-access-log.dto';
import { UpdateAccessLogDto } from './dto/update-access-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessLog } from './entities/access-log.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class AccessLogService {
  constructor(
    @InjectRepository(AccessLog)
    private accessLogRepository: Repository<AccessLog>,
  ) {}
  async create(createAccessLogDto: CreateAccessLogDto) {
    const newAccessLogDto = await this.accessLogRepository.create(
      this.dtoToEntity(createAccessLogDto),
    );
    return this.accessLogRepository.save(newAccessLogDto);
  }

  private dtoToEntity(dto: CreateAccessLogDto): Partial<AccessLog> {
    const { user, location } = dto;
    return { user, location } as Partial<AccessLog>;
  }

  async findAll() {
    return await this.accessLogRepository.find({
      withDeleted: true,
      relations: ['user', 'location'],
    });
  }

  // Que muestre todos los accesslog de ese usuario
  // async findAll({ userId }) {
  //   return await this.accessLogRepository.find({
  //     withDeleted: true,
  //     relations: ['user', 'location'],
  //   });
  // }

  async findOne(id: UUID) {
    const accessLog = await this.accessLogRepository.findOne({ where: { id }, relations: ['user', 'location'] });

    if (!accessLog) {
      throw new NotFoundException(`No accessLog found with id: ${id}`);
    }
    return accessLog;
  }

  async update(id: UUID, updateAccessLogDto: UpdateAccessLogDto) {
    const accessLog = await this.accessLogRepository.findOne({ where: { id } });

    if (!accessLog) {
      throw new NotFoundException(`No accessLog found with id: ${id}`);
    }

    accessLog.user = updateAccessLogDto.user || accessLog.user;
    accessLog.location = updateAccessLogDto.location || accessLog.location;

    return this.accessLogRepository.save(accessLog);
  }

  async remove(id: UUID) {
    return await this.accessLogRepository.softDelete(id);
  }
}
