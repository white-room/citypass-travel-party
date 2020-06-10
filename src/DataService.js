import VerifyManual from "./mocks/VerifyManual.json";

const payloads = {
  VerifyManual
};

function DataService() {
  return {
    serverCall(path, method, request, success, error, payloadID) {
      console.log(
        `[DataService] called with ${JSON.stringify(
          {
            path,
            method,
            request,
            success,
            error
          },
          null,
          2
        )}`
      );

      const [_, __, route] = path.split("/");

      setTimeout(() => {
        if (!payloads[route]?.[payloadID]) return error("invalid payload id");
        return success(payloads[route][payloadID]);
      }, 400);
    }
  };
}

DataService.ActionTypes = {
  Post: "POST"
};

export default DataService;
