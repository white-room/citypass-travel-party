import DataService from "./DataService";

function TravelPartyDataService() {
  var self = this;
  var dataService = new DataService();

  self.verifyManual = function(
    request,
    successFunction,
    errorFunction,
    payloadID
  ) {
    dataService.serverCall(
      "/TravelParty/VerifyManual",
      DataService.ActionTypes.Post,
      request,
      successFunction,
      errorFunction,
      payloadID
    );
  };
}

export default TravelPartyDataService;
