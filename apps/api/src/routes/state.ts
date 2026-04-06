import { getStates } from "@/controllers/states.ts";
import { withCors } from "@/middleware/with-cors.ts";

/**
 * Defining state-related routes for the API.
 */
export const stateRoutes = {
  "/states": withCors(async () => getStates()),
};
