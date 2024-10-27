import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { unwrapResolverError } from '@apollo/server/errors';
import { GraphQLSchema } from 'graphql';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { RequestHandler } from 'express';
import clc from 'cli-color';

export async function startServer(
    httpServer: Server<typeof IncomingMessage, typeof ServerResponse>,
    schema: GraphQLSchema,
): Promise<RequestHandler<any>> {
    try {
        const server = new ApolloServer({
            schema,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
            formatError: (formattedError, error) => {
                //TODO: allow it to read dolph_cli to know which database is being used then throw Internal Server Error for it
                //  if(unwrapResolverError(error) instanceof  DBError){
                // return { message: "Internal Server rror" }
                // }

                if (formattedError.message.startsWith('Validation:')) {
                    return {
                        ...formattedError,
                        message: formattedError.message.replace(/^Validation: /, ''),
                        extensions: { ...formattedError?.extensions, code: 'VALIDATION' },
                    };
                }

                return formattedError;
            },
        });

        await server.start();

        const middleware = expressMiddleware(server);

        return middleware;
    } catch (err: any) {
        console.log(`${clc.red('GRAPHQL REGISTRAR ERROR: ')} ${err}`);
    }
}
