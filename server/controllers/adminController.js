import Booking from "../models/Booking.js";
import User from "../models/User.js";
export const getAdminStats = async (req,res,next)=>{try{const [users,bookings]=await Promise.all([User.countDocuments(),Booking.countDocuments()]);res.json({success:true,stats:{users,bookings}});}catch(e){next(e);}};