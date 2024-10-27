import { GraphQLError } from 'graphql';

export class BadRequestError extends GraphQLError {
    constructor(message: string) {
        const options = {
            extensions: {
                code: 'BAD REQUEST',
                http: { status: 400 },
            },
        };
        super(message, options);
    }
}
