import * as jsonfile from 'jsonfile';
import { env } from '../src/env';

const jsonDataFile: any = jsonfile.readFileSync('src/api/swagger.json');
jsonDataFile.host = `${env.app.host}:${env.app.port}`;
jsonfile.writeFileSync('src/api/swagger-spectacle.json', jsonDataFile, (error) => {
    if (error === null) {
        process.exit(0);
    } else {
        console.error('Failed to generate the swagger-spectacle.json', error);
        process.exit(1);
    }
});
