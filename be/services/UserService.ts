import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { RegisterUserRequest, RegisterUserResponse } from '../../ts-shared/dtos/user';
import { IUser } from '../model/User';
import { IUserRepository } from '../repositories/UserRepository';
import { Optional, ofNullable } from '../../ts-shared/optional';

export interface IUserService {
  registerUser: (request: RegisterUserRequest) => Promise<RegisterUserResponse>;
  findUserById: (userId: string) => Promise<Optional<IUser>>;
  findUserByLoginId: (loginId: string) => Promise<Optional<IUser>>;
}

export class UserService implements IUserService {

  constructor(private readonly userRepository: IUserRepository, private readonly passwordHashRounds: number) { }

  async registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const user: IUser = {
      _id: uuid(),
      loginId: request.loginId,
      displayName: request.displayName,
      password: await bcrypt.hash(request.password, this.passwordHashRounds),
      roles: [],
      createdAt: null,
      updatedAt: null,
    };
    // TODO check if username already taken
    await this.userRepository.save(user);

    return {
      id: user._id,
      loginId: user.loginId,
      displayName: user.displayName,
    };
  }

  async findUserById(userId: string): Promise<Optional<IUser>> {
    return ofNullable(await this.userRepository.findById(userId));
  }

  async findUserByLoginId(loginId: string): Promise<Optional<IUser>> {
    return ofNullable(await this.userRepository.findByLoginId(loginId));
  }
}
