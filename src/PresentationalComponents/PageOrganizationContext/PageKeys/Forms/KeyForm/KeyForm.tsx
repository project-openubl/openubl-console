import React from "react";
import { Schema } from "@data-driven-forms/react-form-renderer";
import FormRenderer from "@data-driven-forms/react-form-renderer/dist/cjs/form-renderer";
import FormTemplate from "@data-driven-forms/pf4-component-mapper/dist/cjs/form-template";
import componentTypes from "@data-driven-forms/react-form-renderer/dist/cjs/component-types";
import validatorTypes from "@data-driven-forms/react-form-renderer/dist/cjs/validator-types";
import {
  oulComponentMapper,
  oulComponentTypes,
} from "../../../../DDF/oul-component-mapper";
import {
  ComponentTypeRepresentation,
  ConfigPropertyRepresentation,
  ComponentRepresentation,
} from "../../../../../models/api";

export interface KeyFormProps {
  componentType: ComponentTypeRepresentation;
  component?: ComponentRepresentation;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const getComponentFields = (
  value: ConfigPropertyRepresentation
): {
  component: string;
  type: string | undefined;
  options: {
    label: string;
    value: string;
  }[];
  validate: any[];
} => {
  let component: string;
  switch (value.type) {
    case "String":
    case "Password":
      component = componentTypes.TEXT_FIELD;
      break;
    case "File":
      component = oulComponentTypes.TEXT_FIELD_CERTIFICATE;
      break;
    case "boolean":
      component = componentTypes.SWITCH;
      break;
    case "List":
      component = componentTypes.SELECT;
      break;
    default:
      throw new Error("Component type:" + value + " unsupported");
  }

  let type: string | undefined = undefined;
  switch (value.type) {
    case "Password":
      type = "password";
      break;
    case "File":
      type = "text";
      break;
  }

  let validate: any[] = [];
  switch (value.type) {
    case "String":
    case "Password":
    case "File":
    case "List":
      validate.push({
        type: validatorTypes.REQUIRED,
        message: "This field is required",
      });
      break;
  }

  return {
    component,
    type: type,
    options: value.options?.map((o) => ({ label: o, value: o })),
    validate: [],
  };
};

export const KeyForm: React.FC<KeyFormProps> = ({
  componentType,
  onSubmit,
  onCancel,
}) => {
  const schema: Schema = {
    fields: [
      {
        name: "name",
        label: "Name",
        component: componentTypes.TEXT_FIELD,
        isRequired: true,
        initialValue: componentType.id,
        validate: [
          { type: validatorTypes.REQUIRED, message: "This field is required" },
          {
            type: validatorTypes.PATTERN,
            pattern: "^[-a-zA-Z0-9]+$",
            message: "Invalid value",
          },
        ],
      },
      ...componentType.properties.map((e: ConfigPropertyRepresentation) => ({
        name: e.name,
        label: e.label,
        initialValue: e.defaultValue,
        isRequired: true,
        ...getComponentFields(e),
      })),
    ],
  };

  return (
    <FormRenderer
      schema={schema}
      componentMapper={oulComponentMapper}
      FormTemplate={FormTemplate}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};
