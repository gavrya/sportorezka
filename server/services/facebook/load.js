const load = async (fetch, validate) => {
  try {
    const data = await fetch();
    const errors = await validate(data);

    return {
      errors,
      data,
    };
  } catch (error) {
    return {
      errors: [error.message],
      data: null,
    };
  }
};

module.exports = load;
