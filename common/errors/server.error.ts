import { GraphQLError } from 'graphql';

export class ServerError extends GraphQLError {
    constructor(message: string) {
        const options = {
            extensions: {
                code: 'SERVER ERROR',
                http: { status: 500 },
            },
        };
        super(message, options);
    }
}
