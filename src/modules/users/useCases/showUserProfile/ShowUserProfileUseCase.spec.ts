
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let usersRepository: IUsersRepository;

describe('Test showing a user profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    showUserProfileUseCase = new ShowUserProfileUseCase(
      usersRepository)
  })

  it('should be able to receive a jwt token and show that user profile', async () => {
    const user = await usersRepository.create({
      name: 'users sample',
      email: 'users@example.com',
      password: 'test password'
    })

    const userProfile = await showUserProfileUseCase.execute(user.id)

  })
})
