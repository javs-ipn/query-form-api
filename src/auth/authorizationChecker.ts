import { Action } from 'routing-controllers';
import { AuthService } from './AuthService';
import { Connection } from 'typeorm';
import { Container } from 'typedi';
import { Logger } from '../lib/logger';

export function authorizationChecker(connection: Connection): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        // here you can use request/response objects from action
        // also if decorator defines roles it needs to access the action
        // you can use them to provide granular access check
        // checker must return either boolean (true or false)
        // either promise that resolves a boolean value
        // demo code:
        const token = await authService.parseTokenFromRequest(action.request);
        console.log('token', token);

        if (token === undefined) {
            log.warn('No token given');
            return false;
        }

        return true;
    };
}
