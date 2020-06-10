import $ from "jquery";
import ko from "knockout";
import "knockout.validation";
import "bootstrap";
import TravelPartyDataService from "./TravelPartyDataService";
import {
  EmailInput,
  OrderNumberInput,
  PrimaryDataInput,
  BarcodeInput,
  SecondaryDataInput,
  SecurityCodeInput
} from "./Inputs";
import BaseModel from "./BaseModel";
import VerifyManual from "./mocks/VerifyManual";

import { CONDITIONS } from "./constants";

var TravelPartyVM = function() {
  var self = this;
  var dataService = new TravelPartyDataService();
  var MAX_ATTEMPTS = 5;

  // props

  self.ready = true;
  self.attempts = ko.observable(0);
  self.loading = ko.observable(false);
  self.success = ko.observable(false);
  self.error = ko.observable();
  self.submitBtnText = ko.observable("Continue");
  self.validationOptions = {
    decorateInputElement: true,
    errorMessageClass: "form-text text-danger small",
    errorElementClass: "border-danger text-danger"
  };

  // dev only
  self.mockConditions = Object.values(CONDITIONS);
  self.mockPayloadID = ko.observable("validEmailValidOrder");
  self.payloadIDs = Object.keys(VerifyManual);

  self.model = ko.observable(
    new BaseModel({
      dataService: dataService,
      serviceMethod: "verifyManual",
      inputs: {
        email: new EmailInput(),
        primaryData: new PrimaryDataInput(),
        secondaryData: new SecondaryDataInput(),
        orderNumber: new OrderNumberInput(),
        barcode: new BarcodeInput(),
        securityCodes: ko.observableArray([new SecurityCodeInput()])
      }
    })
  );

  console.log(self.model().inputs.securityCodes());

  self.model().inputs.email.value("miles@citypass.com");
  self.model().inputs.primaryData.value("1234");

  self.hasReachedAttemptLimit = function hasReachedAttemptLimit() {
    return self.attempts() > MAX_ATTEMPTS;
  };

  // methods
  self.onSubmit = function onSubmit(form) {
    var model = self.model();

    if (!model.validate()) return;

    setLoading();
    incrementAttempts();

    if (self.hasReachedAttemptLimit()) {
      setError("You've exceeded the maximum allowable attempts.");
      setAttemptsExceededCookie();
      return;
    }

    model.verify(
      function(res) {
        var status = res.AuthenticationStatusText;
        var authStatusHandlers = {
          Success: function(res) {
            setSuccess(res);
          },
          AdditionalDataRequired: function(res) {
            setIdle();
          },
          SoftFailure: function(res) {
            setError(res.InternalFailureMessage);
          },
          HardFailure: function(res) {
            setError(res.InternalFailureMessage);
          },
          unknown: function(res) {
            setError("Unknown error");
          }
        };

        authStatusHandlers[status]
          ? authStatusHandlers[status](res)
          : authStatusHandlers.unknown();
      },
      function(err) {
        setError(err);
      },
      self.mockPayloadID()
    );
  };

  self.reset = function() {
    self.success(false);
    self.error(false);
    self.attempts(0);
    setIdle();
  };

  init();

  // private
  function init() {
    setIdle();
  }

  function incrementAttempts() {
    self.attempts(self.attempts() + 1);
  }

  function setAttemptsExceededCookie() {
    // todo: implement
  }

  function setLoading() {
    self.loading(true);
    self.submitBtnText("Loading...");
  }

  function setIdle() {
    self.loading(false);
    self.submitBtnText("Continue");
  }

  function setSuccess() {
    setIdle();
    self.success(true);
  }

  function setError(err) {
    setIdle();
    self.error(err);
  }
};

var model = new TravelPartyVM();
ko.applyBindings(model, $("#travel-party-identification-container")[0]);
