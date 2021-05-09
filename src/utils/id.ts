import mongoose, { Document, Model, Schema } from 'mongoose';

interface IdGenerator {
  prefix: string;
  seq: number;
  generateId(): string;
}

const MODEL_ID = 'generator';

interface IdGeneratorDocument extends IdGenerator, Document {}

interface IdGeneratorModel extends Model<IdGeneratorDocument> {}

const IdGeneratorSchema = new Schema<IdGeneratorDocument, IdGeneratorModel>({
  _id: String,
  prefix: {
    type: String,
    default: 'AGT',
    uppercase: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

IdGeneratorSchema.methods.generateId = async function (
  this: IdGeneratorDocument
) {
  const newIdGenerator = `${this.prefix}-${this.seq}`;
  this.seq = this.seq + 1;
  await this.save();

  return newIdGenerator;
};

const IdGeneratorModel = mongoose.model<IdGeneratorDocument, IdGeneratorModel>(
  'idGenerator',
  IdGeneratorSchema
);

const createIdGenerator = async (): Promise<IdGeneratorDocument> => {
  const existing = await IdGeneratorModel.findById(MODEL_ID);

  if (existing) {
    return existing;
  }

  return new IdGeneratorModel({ _id: MODEL_ID });
};

const idGenerator = createIdGenerator();

export const setIdPrefix = async (prefix: string) => {
  (await idGenerator).prefix = prefix;
  return (await (await idGenerator).save()).prefix;
};

export const generateId = async () => (await idGenerator).generateId();

export const getGeneratorPrefix = async () => (await idGenerator).prefix;
