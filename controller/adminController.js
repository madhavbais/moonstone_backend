const admin = require("../model/adminModel");
const asynchandler = require("express-async-handler");
const { refreshtoken} = require("../config/refreshtoken");
const {generateToken} = require('../config/jwttoken')
const jwt = require("jsonwebtoken");
//singup
const addAdmin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const superAdmin = req.body.superAdmin;
  const registrationDesk = req.body.registrationDesk;
  const finance = req.body.finance;
  const eventDepartment = req.body.eventDepartment;
  const subAdmin = req.body.subAdmin;
  const findAdmin = await admin.findOne({ email: email });
  if (!findAdmin) {
    try {
      const newAdmin = await admin.create({
        email: email,
        password: password,
        superAdmin: superAdmin,
        subAdmin: subAdmin,
        registrationDesk: registrationDesk,
        finance: finance,
        eventDepartment: eventDepartment,
      });
      res.json({
        msg: "Admin added successfully",
        status: 200,
        sucess: true,
      });
    } catch (error) {
      res.json({
        msg: "unable to create new Admin",
        status: 500,
        success: false,
      });
    }
  } else {
    res.json({
      msg: "Admin already exist cannot create new admin",
      status: 500,
      success: false,
    });
  }
};
//login
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  //console.log(email,password);
  const finduser = await admin.findOne({ email: email });
  if (finduser && (await finduser.isPasswordMatched(password))) {
    const token = await refreshtoken(finduser?._id);
    const updateuser = await admin.findByIdAndUpdate(
      finduser._id,
      {
        refreshtoken: token,
      },
      { new: true }
    );
    res.cookie("refreshtoken", token, {
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: finduser?._id,

      email: finduser?.email,
      password: finduser?.password,
      superAdmin: finduser?.superAdmin,
      finance: finduser?.finance,
      registrationDesk: finduser?.registrationDesk,
      eventDepartment: finduser?.eventDepartment,
      token: generateToken(finduser?._id),
    });
  } else {
    throw new Error(" invalid user credentials");
  }
});

const deleteAdmin = async (req, res) => {
  const adminID = req.body.adminID;
  const findAdmin = await admin.findOne({ adminID: adminID });

  if (findAdmin) {
    await admin.deleteOne({ adminID: adminID });

    res.json({
      msg: "Admin deleted successfully",
      status: 200,
      success: true,
    });
  } else {
    res.json({
      msg: "Admin not found",
      status: 500,
      success: false,
    });
  }
};

// handling refesh token
const handleRefreshToken = asynchandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshtoken) throw new Error("No Refresh Token in Cookies");
  const refreshtoken = cookie.refreshtoken;
  const user = await admin.findOne({ refreshtoken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshtoken, process.env.secret_key, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});
const getalladmindata=asynchandler(async(req,res)=>{
  const getadmin = await admin.find()
  res.json(getadmin)
})
const checkvalidity = asynchandler(async (req, res) => {
  res.send("user is a varified admin ");
});
module.exports = {
  addAdmin,
  deleteAdmin,
  loginUser,
  handleRefreshToken,
  checkvalidity,
  getalladmindata
};
