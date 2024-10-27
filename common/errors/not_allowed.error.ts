import { GraphQLError } from 'graphql';

export class NotAllowedError extends GraphQLError {
    constructor(message: string) {
        const options = {
            extensions: {
                code: 'NOT ALLOWED',
                http: { status: 402 },
            },
        };
        super(message, options);
    }
}
