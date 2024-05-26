// src/wallet-address/dto/create-wallet-address.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateWalletAddressDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  address: string;
}
