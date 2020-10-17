import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const PASSWORD_SALT_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    email: { type: String, unique: false },
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }]
  },
  { timestamps: true }
);
UserSchema.pre("save", function(next) {
  var user = this;
  //do password hash only when password is changed or new
  if (!user.isModified("password")) next();
  //Generate password salt
  bcrypt.genSalt(PASSWORD_SALT_FACTOR, function(error, salt) {
    if (error) return next(error);
    bcrypt.hash(user.password, salt, function(error, passwordHash) {
      if (error) return next(error);
      // override the cleartext password with the hashed one
      user.password = passwordHash;
      next();
    });
  });
});

UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.generateToken = user => {
  console.log("generate token", this);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username
    },
    "am-secret-key",
    {
      expiresIn: 3600
    }
  );
};
/* 
  _hashPassword(
    password,
    saltRounds = Constants.security.saltRounds,
    callback
  ) {
    return bcrypt.hash(password, saltRounds, callback);
  } */

const User = mongoose.model("User", UserSchema);

export default User;
