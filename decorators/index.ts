import 'reflect-metadata';

import { buildSchema, BuildSchemaOptions, NonEmptyArray } from 'type-graphql';
import { CREATE_SCHEMA_KEY } from './keys';

export const CreateSchema = (buildSchemaOptions: BuildSchemaOptions): ClassDecorator => {
    return (target: any) => {
        async function createSchema() {
            return await buildSchema({
                ...buildSchemaOptions,
            });
        }

        const schema = createSchema();

        Reflect.defineMetadata(CREATE_SCHEMA_KEY, schema, target.prototype);
    };
};
