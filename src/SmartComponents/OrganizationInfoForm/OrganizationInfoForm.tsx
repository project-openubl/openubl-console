import React, { useState } from "react";
import {
  TextContent,
  Text,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { getOrganizationByName } from "../../api/api";
import { debouncePromise } from "../../utils/debounce";
import { OrganizationFormData } from "../../models/ui";

export interface OrganizationInfoFormProps {
  formData: OrganizationFormData;
  onHandleChange: (data: OrganizationFormData) => void;
  setIsOrganizationInfoFormValid: (result: boolean) => void;
}

type ValidationState = "success" | "error" | "default";

export const OrganizationInfoForm: React.FC<OrganizationInfoFormProps> = ({
  formData,
  onHandleChange,
  setIsOrganizationInfoFormValid,
}) => {
  const [error, setError] = useState<ValidationState>("default");
  const [errorNameInvalidText, setErrorNameInvalidText] = useState<string>();
  const { description = "", name = "" } = formData;

  const validateName = (name: string) =>
    getOrganizationByName(name)
      .then(({ data }) => {
        return data.data.find((pol) => name === pol.name)
          ? "Este nombre no está disponible"
          : undefined;
      })
      .catch(() => {
        return "There was an error retrieving data. Check your connection and try again.";
      });

  const setResult = (result: string | undefined) => {
    setErrorNameInvalidText(result);
    setError(result ? "error" : "success");
    setIsOrganizationInfoFormValid(!result);
  };

  const debouncedValidator = (
    name: string,
    validateCallback: (result: string | undefined) => void
  ) =>
    debouncePromise(
      validateName(name).then((result) => validateCallback(result)),
      250
    );

  const handleNameChange = () => {
    debouncedValidator(name, setResult);
  };

  return (
    <React.Fragment>
      <Stack hasGutter={true}>
        <StackItem>
          <TextContent>
            <Text component="h1">Datos generales</Text>
          </TextContent>
        </StackItem>
        <StackItem>
          <Form isHorizontal>
            <FormGroup
              label="Nombre"
              isRequired
              fieldId="name"
              helperText={
                error === "success"
                  ? "Nombre disponible"
                  : "Escriba el nombre o nickname de la organización"
              }
              validated={error}
              helperTextInvalid={errorNameInvalidText}
            >
              <TextInput
                isRequired
                type="text"
                id="name"
                name="name"
                aria-describedby="name"
                value={name}
                onBlur={handleNameChange}
                onChange={(_, event) => {
                  setError("default");
                  onHandleChange({ name: event.currentTarget.value });
                }}
              />
            </FormGroup>
            <FormGroup label="Descripción" fieldId="description">
              <TextArea
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(_, event) =>
                  onHandleChange({ description: event.currentTarget.value })
                }
              />
            </FormGroup>
          </Form>
        </StackItem>
      </Stack>
    </React.Fragment>
  );
};
