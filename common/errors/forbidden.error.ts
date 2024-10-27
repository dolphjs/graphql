import { GraphQLError } from 'graphql';

export class ForbiddenError extends GraphQLError {
    constructor(message: string) {
        const options = {
            extensions: {
                code: 'FORBIDDEN',
                http: { status: 403 },
            },
        };
        super(message, options);
    }
}
