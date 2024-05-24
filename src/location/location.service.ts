import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}
  async create(createLocationDto: CreateLocationDto) {
    const isExistName = await this.locationRepository.findOne({
      where: { name: createLocationDto.name },
    });

    if (isExistName) {
      throw new HttpException(
        'Name location already registered',
        HttpStatus.UNAUTHORIZED, //buscar otra opcion
      );
    }
    const createLocation = this.locationRepository.create(createLocationDto);

    return this.locationRepository.save(createLocation);
  }

  async findAll() {
    return await this.locationRepository.find({
      withDeleted: true,
    });
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne({ where: {id} }); 

    if(!location) {
      throw new NotFoundException(`No location found for ${id}`);
    }
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.findOne({ where: {id} });

    if(!location) {
      throw new NotFoundException(`No location found for ${id}`);
    }
    location.name = updateLocationDto
    .name || location.name;
    location.direction = updateLocationDto.direction || location.direction;
    location.lat = updateLocationDto.lat || location.lat;
    location.long = updateLocationDto.long || location.long;

    return this.locationRepository.save(location);
  }

  async remove(id: number) {
    return await this.locationRepository.softDelete(id);
  }
}
