export const successResponse = (response) => {
  return {
    success: true,
    res: response,
  };
};

export const errorResponse = (err) => {
  return {
    error: err,
  };
};
