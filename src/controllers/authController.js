import jwt from 'jsonwebtoken';
import db  from '../data/firebase.js';

export const login = async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  try {
    const snapshot = await db.collection('usuarios').where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const doc = snapshot.docs[0];
    const usuario = doc.data();


    if (contraseña != usuario.contraseña) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { uid: doc.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: doc.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error("Error al procesar login:", error);
    return res.status(500).json({ error: 'Error al procesar login' });
  }
};
