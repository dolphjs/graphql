import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { unwrapResolverError } from '@apollo/server/errors';
import { GraphQLSchema } from 'graphql';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { RequestHandler } from 'express';
import clc from 'cli-color';
import { DolphGraphQLContextFunction } from '../common';

export async function startServer<TContext>(
    httpServer: Server<typeof IncomingMessage, typeof ServerResponse>,
    schema: GraphQLSchema,
    context?: DolphGraphQLContextFunction<TContext>,
): Promise<RequestHandler<any>> {
    try {
        const server = new ApolloServer<TContext>({
            schema,
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer }),
                /**
                 * Todo: Add ApolloServerPluginCacheControl({ calculateHttpHeaders: 'if-cacheable' })
                 * where the value of `calculateHttpHeaders` is passed via the dolph config file
                 */
            ],
            formatError: (formattedError, error) => {
                /**
                 * TODO: allow it to read dolph_cli to know which database is being used then throw *Internal Server Error for it
                 */

                //  if(unwrapResolverError(error) instanceof  DBError){
                // return { message: "Internal Server Error" }
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

        const middleware = expressMiddleware(server, {
            context,
        });

        return middleware;
    } catch (err: any) {
        console.log(`${clc.red('GRAPHQL REGISTRAR ERROR: ')} ${err}`);
    }
}
