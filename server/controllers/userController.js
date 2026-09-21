import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      users,
    });
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      location,
      serviceLocation,
      isActive,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          phone,
          location,
          serviceLocation: {
            address: serviceLocation?.address || "",
            latitude:
              serviceLocation?.latitude !== undefined
                ? serviceLocation.latitude
                : null,
            longitude:
              serviceLocation?.longitude !== undefined
                ? serviceLocation.longitude
                : null,
          },
          isActive,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (e) {
    next(e);
  }
};