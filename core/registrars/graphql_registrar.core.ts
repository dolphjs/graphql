import { IncomingMessage, Server, ServerResponse } from 'http';
import { GraphQLSchema } from 'graphql';
import { startServer } from '../factory.core';

class GraphQLAdapterClass {
    private static instance: GraphQLAdapterClass;
    private httpServer: Server<typeof IncomingMessage, typeof ServerResponse>;
    private schema: Promise<GraphQLSchema>;

    private constructor() {}

    public static getInstance(): GraphQLAdapterClass {
        if (!GraphQLAdapterClass.instance) {
            GraphQLAdapterClass.instance = new GraphQLAdapterClass();
        }

        return GraphQLAdapterClass.instance;
    }

    public async apolloServer(
        httpServer: Server<typeof IncomingMessage, typeof ServerResponse>,
        schema: Promise<GraphQLSchema>,
    ) {
        this.schema = schema;
        this.httpServer = httpServer;

        return startServer(this.httpServer, await this.schema);
    }
}

export const GraphQLAdapter = GraphQLAdapterClass.getInstance();
