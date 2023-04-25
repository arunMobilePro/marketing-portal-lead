import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoles } from '../user/enums/user.roles.enums';
import { UserRepository } from '../user/schemas/user.repository';


@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { sub } = request.user;
      const user = await this.userRepository.findById(sub);
      return user.role+"" === UserRoles.ADMIN;
    }

    return false;
  }
}
