import jwt, { decode } from "jsonwebtoken";

export function generateAccessToken(user) {
  const payload = {
    role: user.role,
    id: user._id,
  };

  const secret = "hhhoanghuy";
  const options = { expiresIn: "4d" };

  return jwt.sign(payload, secret, options);
}

export function verifyAccessToken(token) {
  const secret = "hhhoanghuy";

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
