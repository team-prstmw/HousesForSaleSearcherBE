export const getByIdAbstract = async (id, model) => {
  const data = await model.findById(id).exec();

  if (!data || !data._id) {
    return { status: 'invalid', message: 'There is no object with this id.' };
  }

  return { status: 'success', data };
};
