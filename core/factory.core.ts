import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLSchema } from 'graphql';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { RequestHandler } from 'express';
import clc from 'cli-color';

export function startServer(
    httpServer: Server<typeof IncomingMessage, typeof ServerResponse>,
    schema: GraphQLSchema,
): RequestHandler<any> {
    let server: ApolloServer<BaseContext>;

    const internalFunc = async () => {
        server = new ApolloServer({
            schema,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });

        await server.start();
    };

    internalFunc()
        .then((result) => {})
        .catch((err) => {
            console.log(`${clc.red('GRAPHQL REGISTRAR ERROR: ')} ${err}`);
        });

    const middleware = expressMiddleware(server);

    return middleware;
}
