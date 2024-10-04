export const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.json({
      success: false,
      message: "Invalid authentication"
    });
  }
}