// middleware/roleMiddleware.js
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Assuming you have the employee role stored in the JWT or session
    console.log("Req body is",req.body);
    
    const { role } = req.body; // Adjust based on how you store employee info

    if (roles.includes(role)) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};

module.exports = roleMiddleware;
