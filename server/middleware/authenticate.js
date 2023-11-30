// authenticate.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({
          message: 'Authorization token is missing',
      });
  }

  try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log('Decoded User Data:', decodedData);

      req.user = decodedData;
    //   console.log(req.user.username);
      next();
  } catch (error) {
      console.error('Token verification error:', error);
      console.log(token);
      if (error.name === 'TokenExpiredError') {
          return res.status(401).json({
              message: 'Token has expired',
          });
      }

      return res.status(401).json({
          message: 'Invalid token',
      });
  }
};
