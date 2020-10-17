export * from "./user";
export * from "./auth";
export * from "./role";
export * from "./link";
export * from "./apiError";
import apiError from "./apiError";

export const controllerHandler = (promise, params) => async (
  req,
  res,
  next
) => {
  const boundParams = params ? params(req, res, next) : [];
  // console.log("boundParams ", boundParams);
  //console.log("promise ", promise);

  try {
    const result = await promise(...boundParams);
    console.log("result ", result);

    return res.json(result);
  } catch (error) {
    console.debug("controllerHandler error", error);
    if (error instanceof apiError) {
      return res.status(error.status).json({ error });
    }
    res.status(500);

    return res.end();
  }
};
