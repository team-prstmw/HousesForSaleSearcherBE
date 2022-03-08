export const getByIdAbstract = async (id, model) => {
  const data = await model.findById(id).exec();

  if (!data || !data._id) {
    const collection = model.collection.collectionName;
    return { status: 'invalid', message: `${id} doesn't exist in ${collection}.` };
  }

  return { status: 'success', data };
};
