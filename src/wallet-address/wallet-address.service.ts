import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from './entities/wallet-address.entity';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WalletAddressService {
  constructor(
    @InjectRepository(WalletAddress)
    private walletAddressRepository: Repository<WalletAddress>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createWalletAddressDto: CreateWalletAddressDto,
  ): Promise<WalletAddress> {
    const user = await this.usersRepository.findOneBy({
      id: createWalletAddressDto.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createWalletAddressDto.userId} not found`,
      );
    }
    const walletAddress = this.walletAddressRepository.create({
      ...createWalletAddressDto,
      user,
    });
    return this.walletAddressRepository.save(walletAddress);
  }

  findAll(): Promise<WalletAddress[]> {
    return this.walletAddressRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<WalletAddress> {
    const walletAddress = await this.walletAddressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!walletAddress) {
      throw new NotFoundException(`Wallet address with ID ${id} not found`);
    }
    return walletAddress;
  }

  async update(
    id: number,
    updateWalletAddressDto: UpdateWalletAddressDto,
  ): Promise<WalletAddress> {
    const walletAddress = await this.findOne(id);
    if (!walletAddress) {
      throw new NotFoundException(`Wallet address with ID ${id} not found`);
    }
    Object.assign(walletAddress, updateWalletAddressDto);
    return this.walletAddressRepository.save(walletAddress);
  }

  async remove(id: number): Promise<void> {
    const walletAddress = await this.findOne(id);
    if (!walletAddress) {
      throw new NotFoundException(`Wallet address with ID ${id} not found`);
    }
    await this.walletAddressRepository.remove(walletAddress);
  }
}
