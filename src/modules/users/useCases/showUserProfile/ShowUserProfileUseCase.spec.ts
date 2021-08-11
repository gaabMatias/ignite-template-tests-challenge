import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

import { verify } from 'jsonwebtoken'

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;


describe('Test showing a user profile', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory);

    showUserProfileUseCase = new ShowUserProfileUseCase(
      usersRepositoryInMemory);

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory);

  })

  it('should be able to receive a jwt token and show that user profile', async () => {
    const newUser = {
      name: 'users sample',
      email: 'users@example.com',
      password: 'test password'
    }
    await createUserUseCase.execute(newUser)

    const auth = await authenticateUserUseCase.execute({
      email: newUser.email,
      password: newUser.password
    })
    console.log(auth.user)

    const { id }: string = auth.user

    const profile = await showUserProfileUseCase.execute(id)

    expect(profile).toContain({ newUser })
  })
})
