import { Schema } from 'mongoose';

export type TWithSoftDeleted = {
  isDeleted: boolean;
  deletedAt: Date | null;
};

export const schemaTransform = {
  virtuals: true,
  versionKey: false,
  transform(doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.isDeleted;
    delete ret.deletedAt;
  },
};

const defaultSchemaPlugin = (schema: Schema) => {
  /**
   * Set toJSON transform globally
   */

  schema.set('toJSON', schemaTransform);
  schema.set('toObject', schemaTransform);

  /**
   * Set schema timestamp
   */
  schema.set('timestamps', true);

  /**
   * Implement softDelete
   */
  schema.add({
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  });

  const typesFindQueryMiddleware = [
    'count',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
  ];

  const setDocumentIsDeleted = async (doc: any) => {
    return doc.findOneAndUpdate(
      doc._conditions,
      {
        $set: { isDeleted: true, deletedAt: new Date() },
      },
      { new: true },
    );
  };

  const excludeInFindQueriesIsDeleted = async function (next: any) {
    this.where({ isDeleted: false });
    next();
  };

  const excludeInDeletedInAggregateMiddleware = async function (next: any) {
    this.pipeline().unshift({ $match: { isDeleted: false } });
    next();
  };

  schema.pre('deleteOne', async function (next) {
    await setDocumentIsDeleted(this);

    next();
  });

  schema.pre('deleteMany', async function (this: any, next) {
    await this.updateMany(this._conditions, {
      $set: { isDeleted: true, deletedAt: new Date() },
    });

    next();
  });

  typesFindQueryMiddleware.forEach((type) => {
    schema.pre(type, excludeInFindQueriesIsDeleted);
  });

  schema.pre('aggregate', excludeInDeletedInAggregateMiddleware);
};

export { defaultSchemaPlugin };
