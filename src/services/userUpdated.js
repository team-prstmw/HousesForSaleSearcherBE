import User from "../models/user";

const userUpdated = async (req) => {
    const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
    );
    
    if (!user) return { status: 'invalid', message: 'User not found' };

    return { message: 'Updated' };
}

export default userUpdated;