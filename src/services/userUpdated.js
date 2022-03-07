import User from '../models/user';

const userUpdated = async (req) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    );

    if (!user) return { status: 'invalid', message: 'User not found' };
    return { message: 'Updated' };
  } catch {
    return { status: 'invalid', message: 'User not found' };
  }
};

export default userUpdated;
