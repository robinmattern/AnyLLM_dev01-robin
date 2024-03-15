

const { Telemetry } = require("../models/telemetry");
function chatEndpoints(app) {
  app.post(
    "/workspace/:slug/stream-chat",
    [validatedRequest, flexUserRoleValid([ROLES.all]), validWorkspaceSlug],
  app.post(
    "/workspace/:slug/thread/:threadSlug/stream-chat",
    [
      validatedRequest,
      flexUserRoleValid([ROLES.all]),
      validWorkspaceAndThreadSlug,
    ],
module.exports = { chatEndpoints };


