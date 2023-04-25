import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '../user/schemas/user.repository';
import { ModulesContainer } from '@nestjs/core';
import { Module } from '@nestjs/core/injector/module';
var mongoose = require('mongoose');
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly uesrRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());    
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const { sub } = request.user;
      const user = await this.uesrRepository.findById(sub);
      return roles.includes(user.role + '');
    }
    return false;
  }
}
