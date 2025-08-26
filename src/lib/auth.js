import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function obtenerUsuarioDesdeRequest(request) {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        throw new Error("Token no proporcionado");
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        return decoded.id;
    } catch (error) {
        return new Error("Token inválido o expirado")
    }
}