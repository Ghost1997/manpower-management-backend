import adminRoute from "./adminRoute.js";
import personRoute from "./personRoute.js";
import addressRoute from "./addressRoute.js";
import leaveRoute from "./leaveRoute.js";
import afppRoute from "./afppRoute.js";
import attRoute from "./attRoute.js";
import bpetRoute from "./bpetRoute.js";
import caderRoute from "./caderRoute.js";
import childrenRoute from "./childrenRoute.js";
import courseRoute from "./courseRoute.js";
import discpRoute from "./discpRoute.js";
import ereRoute from "./ereRoute.js";
import firingRoute from "./firingRoute.js";
import pptRoute from "./pptRoute.js";
import promotionRoute from "./promotionRoute.js";
import sickRoute from "./sickRoute.js";
import splRoute from "./splRoute.js";
import weaponRoute from "./weaponRoute.js";
import analyticRoute from "./analyticRoute.js";
import apptRoute from "./apptRoute.js";

const allRoutes = (app) => {
  app.use("/v1/admin", adminRoute);
  app.use("/v1/person", personRoute);
  app.use("/v1/address", addressRoute);
  app.use("/v1/leave", leaveRoute);
  app.use("/v1/afpp", afppRoute);
  app.use("/v1/att", attRoute);
  app.use("/v1/bpet", bpetRoute);
  app.use("/v1/cadre", caderRoute);
  app.use("/v1/children", childrenRoute);
  app.use("/v1/course", courseRoute);
  app.use("/v1/discp", discpRoute);
  app.use("/v1/ere", ereRoute);
  app.use("/v1/firing", firingRoute);
  app.use("/v1/ppt", pptRoute);
  app.use("/v1/promotion", promotionRoute);
  app.use("/v1/sick", sickRoute);
  app.use("/v1/spl", splRoute);
  app.use("/v1/weapon", weaponRoute);
  app.use("/v1/analytic", analyticRoute);
  app.use("/v1/appt", apptRoute);
};

export default allRoutes;