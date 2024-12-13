import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  if (req.path.includes('/api/admin/')) {
    const token = req.headers['token'];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(403).send("Invalid Token");
    }
  }
  return next();
};

const createToken = (user, expire) => {
  // Save expiration date
  const expiration = 60 * 60 * 24 * expire;
  // Create token
  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: `${expire}d`,
    }
  );
  return { token, expiration };
};

export { verifyToken, createToken };