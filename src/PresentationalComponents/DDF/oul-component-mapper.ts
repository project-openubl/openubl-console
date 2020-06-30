import componentMapper from "@data-driven-forms/pf4-component-mapper/dist/cjs/component-mapper";
import { OulTextFieldCertificate } from "./OulTextFieldCertificate";

export enum oulComponentTypes {
  TEXT_FIELD_CERTIFICATE = "text-field-certificate",
}

export const oulComponentMapper = {
  ...componentMapper,
  [oulComponentTypes.TEXT_FIELD_CERTIFICATE]: OulTextFieldCertificate,
};
