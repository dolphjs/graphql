import { IncomingMessage, Server, ServerResponse } from 'http';
import { GraphQLSchema } from 'graphql';
import { startServer } from '../factory.core';
import { DolphGraphQLContextFunction } from '../../common';
import { BaseContext } from '@apollo/server';

class GraphQLAdapterClass {
    private static instance: GraphQLAdapterClass;
    private httpServer: Server<typeof IncomingMessage, typeof ServerResponse>;
    private schema: Promise<GraphQLSchema>;
    private context: DolphGraphQLContextFunction<BaseContext>;

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
        context: DolphGraphQLContextFunction<BaseContext>,
    ) {
        this.schema = schema;
        this.httpServer = httpServer;
        this.context = context;

        return startServer<BaseContext>(this.httpServer, await this.schema, this.context);
    }
}

export const GraphQLAdapter = GraphQLAdapterClass.getInstance();
