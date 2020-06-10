var VERIFY_MANUAL = "VerifyManual";
var VERIFY_ORDER_BARCODE = "VerifyOrderBarcode";
var VERIFY_ORDER_NUMBER = "VerifyOrderNumber";
var VERIFY_SECURITY_CODE = "VerifySecurityCode";

var INPUT_EMAIL = "EMail";
var INPUT_ORDER_NUMBER = "OrderNumber";
var INPUT_BARCODE = "Barcode";
var INPUT_PRIMARY_DATA = "PrimaryData";
var INPUT_SECONDARY_DATA = "SecondaryData";
var INPUT_BOOKLET_BARCODE = "BookletBarcode";
var INPUT_BOOKLET_SECURITY_CODE = "BookletSecurityCode";
var INPUT_SECURITY_CODE = "SecurityCode";

var INPUT_IDS = {};
INPUT_IDS["INPUT_EMAIL"] = INPUT_EMAIL;
INPUT_IDS["INPUT_ORDER_NUMBER"] = INPUT_ORDER_NUMBER;
INPUT_IDS["INPUT_BARCODE"] = INPUT_BARCODE;
INPUT_IDS["INPUT_PRIMARY_DATA"] = INPUT_PRIMARY_DATA;
INPUT_IDS["INPUT_SECONDARY_DATA"] = INPUT_SECONDARY_DATA;
INPUT_IDS["INPUT_BOOKLET_BARCODE"] = INPUT_BOOKLET_BARCODE;
INPUT_IDS["INPUT_BOOKLET_SECURITY_CODE"] = INPUT_BOOKLET_SECURITY_CODE;
INPUT_IDS["INPUT_SECURITY_CODE"] = INPUT_SECURITY_CODE;

var CONDITIONS = {};
CONDITIONS["VERIFY_MANUAL"] = VERIFY_MANUAL;
CONDITIONS["VERIFY_ORDER_BARCODE"] = VERIFY_ORDER_BARCODE;
CONDITIONS["VERIFY_ORDER_NUMBER"] = VERIFY_ORDER_NUMBER;
CONDITIONS["VERIFY_SECURITY_CODE"] = VERIFY_SECURITY_CODE;

export { CONDITIONS, INPUT_IDS };
