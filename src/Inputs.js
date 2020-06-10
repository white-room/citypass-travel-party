import ko from "knockout";
import { INPUT_IDS } from "./constants";

function Input(props) {
  if (!props.id) throw new Error("id is required");
  return {
    id: props.id,
    label: props.label || "",
    placeholder: props.placeholder || "",
    value: props.value || ko.observable(""),
    readOnly:
      props.readOnly || typeof props.readOnly !== "undefined"
        ? props.readOnly
        : false,
    helpModal: props.helpModal || null
  };
}

function EmailInput() {
  return Input({
    id: INPUT_IDS.INPUT_EMAIL,
    label: "Email",
    placeholder: "bob@citypass.com",
    value: ko.observable().extend({
      required: true,
      email: true
    })
  });
}

function SecurityCodeInput() {
  return Input({
    id: INPUT_IDS.INPUT_SECURITY_CODE,
    label: "Security Code",
    placeholder: "ABC1234",
    value: ko.observable().extend({
      required: true,
      pattern: {
        message: "Invalid security code",
        params: "^[\\dA-KMNP-Z]{6}$"
      }
    }),
    helpModal: "#barcode-hints"
  });
}

function PrimaryDataInput() {
  return Input({
    id: INPUT_IDS.INPUT_PRIMARY_DATA,
    label: "CityPASS Order Number or Barcode",
    placeholder: "1234",
    value: ko.observable().extend({
      required: true,
      minLength: 4,
      maxLength: 19,
      pattern: {
        message: "Invalid order number or barcode",
        params: "^\\d{4,19}$"
      }
    }),
    helpModal: "#barcode-hints"
  });
}

function SecondaryDataInput() {
  return Input({
    id: INPUT_IDS.INPUT_SECONDARY_DATA,
    label: "Order Number or Barcode",
    placeholder: "1234",
    value: ko.observable().extend({
      required: true,
      minLength: 4,
      maxLength: 19,
      pattern: {
        message: "Invalid order number or barcode",
        params: "^\\d{4,19}$"
      }
    }),
    helpModal: "#barcode-hints"
  });
}

function BarcodeInput() {
  return Input({
    id: INPUT_IDS.INPUT_BARCODE,
    label: "Barcode",
    placeholder: "1234",
    value: ko.observable("").extend({
      required: false,
      minLength: 16,
      maxLength: 19,
      pattern: {
        message: "Invalid barcode",
        params: "^(\\d{16}|\\d{19})$"
      }
    }),
    helpModal: "#barcode-hints"
  });
}

function OrderNumberInput() {
  return Input({
    id: INPUT_IDS.INPUT_ORDER_NUMBER,
    label: "Order Number",
    placeholder: "1234",
    value: ko.observable("").extend({
      required: false,
      minLength: 2,
      pattern: {
        message: "Invalid order number",
        params: "^\\d{2,}$"
      }
    }),
    helpModal: "#barcode-hints"
  });
}

export {
  EmailInput,
  OrderNumberInput,
  BarcodeInput,
  SecurityCodeInput,
  PrimaryDataInput,
  SecondaryDataInput
};
