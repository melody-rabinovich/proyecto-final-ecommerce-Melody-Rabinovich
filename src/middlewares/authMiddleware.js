import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { uid, rol }
    next();
  } catch {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

