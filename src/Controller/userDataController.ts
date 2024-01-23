
// Controller/userDataController.ts

import { Request, Response } from 'express';
import { Pool } from 'mysql2/promise';
import userModel from '../Model/userModel';

export const insertUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the connection is available in req.app.locals
    if (!req.app.locals.pool) {
      throw new Error('MySQL connection is not available.');
    }

    const pool: Pool = req.app.locals.pool;

    const newUser = {
      id: req.body.id,
      userName: req.body.userName,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
    };

    const userId = await userModel.insertUser(pool, newUser);

    res.status(201).json({ userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the connection is available in req.app.locals
    if (!req.app.locals.pool) {
      throw new Error('MySQL connection is not available.');
    }

    const pool: Pool = req.app.locals.pool;

    const email: string = req.params.email;

    const user = await userModel.getUserByEmail(pool, email);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user by email:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the connection is available in req.app.locals
    if (!req.app.locals.pool) {
      throw new Error('MySQL connection is not available.');
    }

    const pool: Pool = req.app.locals.pool;

    const userId: number = parseInt(req.params.id, 10); // Assuming the user ID is passed in the URL parameter

    const updatedData = {
      userName: req.body.userName,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
    };

    await userModel.updateUserById(pool, userId, updatedData);

    res.json({ message: `User with ID ${userId} updated successfully` });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the connection is available in req.app.locals
    if (!req.app.locals.pool) {
      throw new Error('MySQL connection is not available.');
    }

    const pool: Pool = req.app.locals.pool;

    const userId: number = parseInt(req.params.id, 10); // Assuming the user ID is passed in the URL parameter

    await userModel.deleteUserById(pool, userId);

    res.json({ message: `User with ID ${userId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};