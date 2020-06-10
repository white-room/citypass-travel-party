import ko from "knockout";
import $ from "jquery";
import { SecurityCodeInput } from "./Inputs";
import { CONDITIONS, INPUT_IDS } from "./constants";

function BaseModel(props) {
  props = props || {};

  var dataService = props.dataService;
  var serviceMethod = props.serviceMethod;
  var self = {
    id: props.id,
    inputs: props.inputs || {},
    validate: function validate() {
      var errors = ko.validation.group(
        this.inputList().reduce((acc, input) => {
          acc[input.id] = input.value;
          return acc;
        }, {})
      );
      errors.showAllMessages();
      return errors().length === 0;
    },
    verify: function(successFn, errorFn, payloadID) {
      var request = this.inputList().reduce((acc, input) => {
        acc[input.id] = input.value();
        return acc;
      }, {});

      request.__RequestVerificationToken = $(
        "input[name='__RequestVerificationToken']"
      ).val();

      dataService[serviceMethod](
        request,
        function(res) {
          if (res.AuthenticationStatusText === "AdditionalDataRequired") {
            var primaryDataType = res.PrimaryDataElementTypeText;
            var conditionMap = {
              OrderBarcode: "VerifyOrderNumber",
              OrderNumber: "VerifyOrderBarcode"
            };

            self.currentCondition(conditionMap[primaryDataType]);
          }
          successFn(res);
        },
        errorFn,
        payloadID
      );
    },
    addSecurityCode: function addSecurityCode() {
      this.inputs.securityCodes.push(new SecurityCodeInput());
    }
  };

  self.conditions = {};

  self.conditions[CONDITIONS.VERIFY_MANUAL] = [
    INPUT_IDS.INPUT_EMAIL,
    INPUT_IDS.INPUT_PRIMARY_DATA
  ];

  self.conditions[CONDITIONS.VERIFY_ORDER_BARCODE] = [
    INPUT_IDS.INPUT_EMAIL,
    INPUT_IDS.INPUT_BARCODE,
    INPUT_IDS.INPUT_SECONDARY_DATA
  ];
  self.conditions[CONDITIONS.VERIFY_ORDER_NUMBER] = [
    INPUT_IDS.INPUT_EMAIL,
    INPUT_IDS.INPUT_BARCODE,
    INPUT_IDS.INPUT_ORDER_NUMBER
  ];
  self.conditions[CONDITIONS.VERIFY_SECURITY_CODE] = [
    INPUT_IDS.INPUT_BOOKLET_BARCODE,
    INPUT_IDS.INPUT_BOOKLET_SECURITY_CODE,
    INPUT_IDS.INPUT_SECURITY_CODE
  ];

  self.currentCondition = ko.observable(CONDITIONS.VERIFY_MANUAL);

  self.inputList = ko.pureComputed(function() {
    return Object.values(self.inputs).reduce(function(acc, input) {
      if (self.conditions[self.currentCondition()].indexOf(input.id) > -1)
        acc.push(input);
      return acc;
    }, []);
  });

  return self;
}

export default BaseModel;
