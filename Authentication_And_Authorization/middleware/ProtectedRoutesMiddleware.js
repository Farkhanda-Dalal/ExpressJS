import jwt from "jsonwebtoken";

export const chechAuth = (req, res, next) => {
  //In Postman, under Authorization tab of protected routes:
  //Set Auth Type to Bearer Token
  //Input the Token as the the token generated when a user was loggen in

  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  console.log(`Token = ${token}`);

  //401= Unauthorized
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Please Login to view this page",
    });

  //Decodes token if JWT_SECRET is valid
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    req.userInfo = decodedToken;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not decode JWT",
    });
  }
};
