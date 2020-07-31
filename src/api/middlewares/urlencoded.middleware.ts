import * as bodyParser from 'body-parser';

// create application/x-www-form-urlencoded parser
export const urlencodedParser = bodyParser.urlencoded({ extended: false });
