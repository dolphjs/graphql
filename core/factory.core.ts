import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
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
        });

        await server.start();

        const middleware = expressMiddleware(server);

        return middleware;
    } catch (err: any) {
        console.log(`${clc.red('GRAPHQL REGISTRAR ERROR: ')} ${err}`);
    }
}
