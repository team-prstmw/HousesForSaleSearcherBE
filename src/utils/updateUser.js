import User from "../models/user";

const updateUser = async (req) => {
    const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
    );
    if (!user) return { status: 'invalid', message: 'User not found' };
}

export default updateUser;