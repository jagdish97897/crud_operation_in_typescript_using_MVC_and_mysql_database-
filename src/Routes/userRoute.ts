
// Routes/userRoute.ts

import express from 'express';
import { insertUser,getUserByEmail,updateUser,deleteUser } from '../Controller/userDataController';

const userRoute = express.Router();

// Create a new user
userRoute.post('/api/users', insertUser);
userRoute.get('/api/users/:email',getUserByEmail);
userRoute.put('/api/users/:id',updateUser);
userRoute.delete('/api/users/:id',deleteUser);

export { userRoute };


