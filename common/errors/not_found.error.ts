import { GraphQLError } from 'graphql';

export class NotFoundError extends GraphQLError {
    constructor(message: string) {
        const options = {
            extensions: {
                code: 'NOT FOUND',
                http: { status: 404 },
            },
        };
        super(message, options);
    }
}
