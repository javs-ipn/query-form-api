import { RepositoryMock } from './repository.mock';
import { Credential } from '../../../src/api/models/Credential/Credential';
import { CredentialKey } from '../../../src/api/types/Credential/CredentialKey/credential-key.class';
import { CredentialType } from '../../../src/api/types/enums/credential-type.enum';

export class CredentialRepositoryMock extends RepositoryMock<Credential> {

    public findOneByNameMock = jest.fn();

    public async getCredentialByCourierIdTenantAndType(...args: any[]): Promise<Credential> {
        return this.findOne();
    }

    public async findByCredentialKeyAndType(credentialKey: CredentialKey, credentialType: CredentialType): Promise<Credential> {
        this.findOneByNameMock(credentialType);
        return this.findOne(credentialType);
    }

    public async save(...args: any[]): Promise<Credential> {
        return this.findOne();
    }

}
