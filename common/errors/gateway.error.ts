import { GraphQLError } from 'graphql';

export class GatewayError extends GraphQLError {
    constructor(message: string) {
        const options = {
            extensions: {
                code: 'BAD GATEWAY ',
                http: { status: 502 },
            },
        };
        super(message, options);
    }
}
