import { Injectable } from '@nestjs/common';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
export class UserModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 150 })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isAdmin!: boolean;
}
