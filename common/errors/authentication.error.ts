import { GraphQLError } from 'graphql';

export class UnAuthenticatedError extends GraphQLError {
    constructor(message: string) {
        const options = {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
            },
        };
        super(message, options);
    }
}
