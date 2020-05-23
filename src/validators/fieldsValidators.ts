import {isNotEmpty} from "./isNotEmpty";
import {FORM_FIELDS} from "../constants";

export const fieldsValidators = {
    [FORM_FIELDS.CRITERIA]: [isNotEmpty],
    [FORM_FIELDS.EXPERTS]: [isNotEmpty],
    [FORM_FIELDS.ALTERNATIVES]: [isNotEmpty],
    [FORM_FIELDS.CRITERIA_MATRIX]: [isNotEmpty],
    [FORM_FIELDS.ALTERNATIVES_MATRIXES]: [isNotEmpty]
};
