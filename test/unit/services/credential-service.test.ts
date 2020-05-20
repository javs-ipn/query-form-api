import { CredentialRepositoryMock } from '../lib/delivery-service-type.repository.mock';
import { LogMock } from '../lib/log.mock';
import { CredentialService } from '../../../src/api/services/Credential/credential.service';
import { Credential } from '../../../src/api/models/Credential/Credential';
import { CredentialType } from '../../../src/api/types/enums/credential-type.enum';
import { Courier } from '../../../src/api/models/Courier/Courier';
import { CredentialKey } from '../../../src/api/types/Credential/CredentialKey/credential-key.class';
import { CourierEnum } from '../../../src/api/types/enums/courier-enum';

describe('Credential Service', () => {
    let credentialObj: Credential;
    let courierObj: Courier;
    const EMPTY_RESPONSE = undefined;

    beforeAll(() => {

        courierObj = new Courier();
        courierObj.id = 1;
        courierObj.name = 'DHL';
        courierObj.description = 'Paqueteria DHL';
        courierObj.rateRequestUrl = 'https://wsbexpress.dhl.com/rest/sndpt/RateRequest';
        courierObj.shipmentRequestUrl = 'https://wsbexpress.dhl.com/rest/sndpt/ShipmentRequest';
        courierObj.trackingRequestUrl = 'https://wsbexpress.dhl.com/rest/sndpt/TrackingRequest';
        courierObj.podRequestUrl = 'https://wsbexpress.dhl.com/rest/sndpt/getePOD';
        courierObj.maxPackages = 30;
        courierObj.isRest = true;
        courierObj.rateAction = '';
        courierObj.shipmentAction = '';
        courierObj.trackingAction = '';
        courierObj.podAction = '';
        courierObj.updated = new Date('2019-11-26T22:06:03.457Z');
        courierObj.created = new Date('2019-11-26T22:06:03.457Z');
        courierObj.courierServices = [];

        credentialObj = new Credential();
        credentialObj.name = 'Dhl Shipment';
        credentialObj.tenantId = '54321';
        credentialObj.clientName = 'dev';
        credentialObj.courierId = 1;
        credentialObj.type = 'RATE';
        credentialObj.username = 'envipaqlogiMX';
        credentialObj.password = 'M!2lO!2kU#8s';
        credentialObj.options = '{"customDisplayWaybillNumber": 10, "account": "980129458" }';
        credentialObj.isActive = true;
        credentialObj.created = new Date('2020-01-11T08:43:43.077Z');
        credentialObj.updated = new Date('2020-01-11T08:43:43.077Z');
        credentialObj.courier = courierObj;
    });

    test('Credential service should returns a DHL credential', async (done) => {
        const log = new LogMock();
        const credentialRepositoryMock = new CredentialRepositoryMock();
        credentialRepositoryMock.one = credentialObj;
        try {
            const credentialService = new CredentialService(credentialRepositoryMock as any, log);
            const credentialResponse = await credentialService.getCredentialByCourierIdTenantAndType(1, '123456', CredentialType.RATE);
            expect(credentialResponse.courier.name).toBe('DHL');
            done();
        } catch (error) {
            log.error(error.message);
        }
    });

    test('Credential service should returns not found credential error', async (done) => {
        const log = new LogMock();
        const credentialRepositoryMock = new CredentialRepositoryMock();
        credentialRepositoryMock.one = EMPTY_RESPONSE;
        const credentialService = new CredentialService(credentialRepositoryMock as any, log);
        try {
            await credentialService.getCredentialByCourierIdTenantAndType(1, '33333', CredentialType.RATE);
        } catch (error) {
            log.error(error.message);
            expect(error.message).toBe('Not found credential with courierId: 1 tenant: 33333 and credential type: RATE.');
            done();
        }
    });

    test('Credential service should returns a Rate credential', async (done) => {
        const log = new LogMock();
        const credentialRepositoryMock = new CredentialRepositoryMock();
        credentialRepositoryMock.one = credentialObj;
        const credentialKeyObj = new CredentialKey();
        credentialKeyObj.tenantId = '54321';
        credentialKeyObj.courier = CourierEnum.DHL;
        const credentialService = new CredentialService(credentialRepositoryMock as any, log);
        try {
            const credentialResponse = await credentialService.findByCredentialKeyAndType(credentialKeyObj, CredentialType.RATE);
            expect(credentialResponse.type).toBe(CredentialType.RATE);
            done();
        } catch (error) {
            log.error(error.message);
        }
    });

    test('Credential service should returns a error', async (done) => {
        const log = new LogMock();
        const credentialRepositoryMock = new CredentialRepositoryMock();
        credentialRepositoryMock.one = EMPTY_RESPONSE;
        const credentialKeyObj = new CredentialKey();
        credentialKeyObj.tenantId = '54321';
        credentialKeyObj.courier = CourierEnum.DHL;
        const credentialService = new CredentialService(credentialRepositoryMock as any, log);
        try {
            await credentialService.findByCredentialKeyAndType(credentialKeyObj, CredentialType.RATE);
        } catch (error) {
            log.error(error.message);
            expect(error.message).toBeDefined();
            done();
        }
    });

    test('Credential service should returns the saved credential"', async (done) => {
        const log = new LogMock();
        const credentialRepositoryMock = new CredentialRepositoryMock();
        credentialRepositoryMock.one = credentialObj;
        const credentialService = new CredentialService(credentialRepositoryMock as any, log);
        try {
            const credentialResponse = await credentialService.save(credentialObj);
            expect(credentialResponse).toBe(credentialObj);
            done();
        } catch (error) {
            log.error(error.message);
        }
    });

    test('Credential service save should returns the following error "Can not save credential"', async (done) => {
        const log = new LogMock();
        const credentialRepositoryMock = new CredentialRepositoryMock();
        credentialRepositoryMock.one = EMPTY_RESPONSE;
        const credentialService = new CredentialService(credentialRepositoryMock as any, log);
        try {
            await credentialService.save(credentialObj);
        } catch (error) {
            log.error(error.message);
            expect(error.message).toBe('Can not save credential.');
            done();
        }
    });

});
