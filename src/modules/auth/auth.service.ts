import { CreateUserDto } from '../../common/dto/auth/create-auth';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/auth.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/common/dto/auth/login-auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly repositoryUsers: Repository<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async postCreateUsers(createUserDto: CreateUserDto): Promise<UserModel> {
    const { name, email, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.repositoryUsers.save({
      name,
      email,
      password: hashedPassword,
    });
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    const user = await this.repositoryUsers.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException('Неверный email или пароль');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Неверный email или пароль');

    const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
