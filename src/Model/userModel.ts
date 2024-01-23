
// Model/userModel.ts

import { Pool,ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export interface User {

  userName: string;
  email: string;
  mobile: number;
  password: string;
}

export const createUserTable = async (pool: Pool): Promise<void> => {
  const query = `
      CREATE TABLE IF NOT EXISTS users (
          
          userName VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          mobile INT NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
      )
  `;

  try {
    const connection = await pool.getConnection();
    await connection.execute(query);
    connection.release();
    console.log('User table created successfully');
  } catch (error) {
    console.error('Error creating user table:', error);
    throw error;
  }
};

// Model/userModel.ts

export const insertUser = async (pool: Pool, user: User): Promise<number> => {
  const { userName, email, mobile, password } = user;
  const query = 'INSERT INTO users (userName, email, mobile, password) VALUES (?, ?, ?, ?)';

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute<ResultSetHeader>(query, [userName, email, mobile, password]);
    connection.release();
    return result.insertId;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
};


// export const insertUser = async (pool: Pool, user: User): Promise<number> => {
//   const { userName, email, mobile, password } = user;
//   const query = 'INSERT INTO users SET ?';

//   try {
//     const connection = await pool.getConnection();
//     const [result] = await connection.execute<ResultSetHeader>(query, { userName, email, mobile, password });
//     connection.release();
//     return result.insertId;
//   } catch (error) {
//     console.error('Error inserting user:', error);
//     throw error;
//   }
// };


export const getUserByEmail = async (pool: Pool, email: string): Promise<User | null> => {
  const query = 'SELECT * FROM users WHERE email = ?';

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute<RowDataPacket[]>(query, [email]);
    connection.release();

    // Explicitly specify the type as User[]
    const users: User[] = rows as User[];

    return (users[0] || null);
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};
export const updateUserById = async (pool: Pool, userId: number, updatedData: Partial<User>): Promise<void> => {
  const { userName, email, mobile, password } = updatedData;
  const query = `
    UPDATE users
    SET
      userName = ?,
      email = ?,
      mobile = ?,
      password = ?
    WHERE
      id = ?
  `;

  try {
    const connection = await pool.getConnection();
    await connection.execute(query, [userName, email, mobile, password, userId]);
    connection.release();
    console.log(`User with ID ${userId} updated successfully`);
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

export const deleteUserById = async (pool: Pool, userId: number): Promise<void> => {
  const query = 'DELETE FROM users WHERE id = ?';

  try {
    const connection = await pool.getConnection();
    await connection.execute(query, [userId]);
    connection.release();
    console.log(`User with ID ${userId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

export default {
  createUserTable,
  insertUser,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  // ... (other functions)
};

