class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
    this.statusCode = 401;
  }
}

export default AuthError;
