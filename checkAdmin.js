export const checkAdmin = (req, res, next) => {
    const adminHeader = req.headers['admin'];
  
    if (adminHeader === 'true') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
  };

  //export default checkAdmin;