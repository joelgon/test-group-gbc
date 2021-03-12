import { Connection, createConnections, getConnection } from 'typeorm';

export const connection = async (): Promise<Connection> => {
  try {
    await createConnections();

    return getConnection('db1Connection');
  } catch (error) {
    throw new Error(error);
  }
};
