import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  ActionGroup,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import { getOrganizationByName } from "../../../api/api";
import { debouncePromise } from "../../../utils/debounce";
import { OrganizationFormData } from "../../../models/ui";
import { getValidated } from "../../../utils/forms";
import { notEmpty, pattern, size } from "../../../utils/validation";

export interface OrganizationInfoFormProps {
  formData: OrganizationFormData;
  onHandleChange: (data: OrganizationFormData) => void;
  setIsOrganizationInfoFormValid: (result: boolean) => void;
  showActions?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export const OrganizationInfoForm: React.FC<OrganizationInfoFormProps> = ({
  formData,
  onHandleChange,
  setIsOrganizationInfoFormValid,
  showActions,
  onSave,
  onCancel,
}) => {
  const { description = "", name = "" } = formData;

  const [isUIFormValid, setIsUIFormValid] = useState(false);
  const [isBDNameValid, setIsDBNameValid] = useState(false);
  const [nameHelperTextInvalid, setNameHelperTextInvalid] = useState<string>();
  const [dirty, setDirty] = useState<OrganizationFormData>({});

  useEffect(() => {
    setIsOrganizationInfoFormValid(isUIFormValid && isBDNameValid);
  }, [isUIFormValid, isBDNameValid, setIsOrganizationInfoFormValid]);

  const getFormValues = (values: OrganizationFormData) => {
    return {
      name,
      description,
      ...values,
    };
  };

  const handleChange = (values: OrganizationFormData) => {
    const data = getFormValues(values);
    const isNameValid =
      notEmpty(data.name) && pattern(data.name, new RegExp("^[-a-zA-Z0-9]+$"));
    const isFormValid = isNameValid && size(data.description, 0, 255);

    setIsUIFormValid(isFormValid);
    if (isNameValid) {
      debouncedNameValidator(data.name, setNameValidatorResult);
    } else {
      setNameHelperTextInvalid(
        "Valor debe de contener solamente letras o guiones"
      );
    }

    onHandleChange(data);
    setDirty({ ...dirty, ...values });
  };

  const setNameValidatorResult = (backendResult: string | undefined) => {
    setIsDBNameValid(!backendResult);
    setNameHelperTextInvalid(backendResult);
  };

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

  const debouncedNameValidator = (
    name: string,
    validateCallback: (result: string | undefined) => void
  ) =>
    debouncePromise(
      validateName(name).then((result) => validateCallback(result)),
      250
    );

  return (
    <Form>
      <FormGroup
        label="Nombre"
        isRequired
        fieldId="name"
        validated={getValidated(
          isBDNameValid &&
            notEmpty(name) &&
            pattern(name, new RegExp("^[-a-zA-Z0-9]+$")),
          dirty.name
        )}
        helperTextInvalid={nameHelperTextInvalid}
      >
        <TextInput
          isRequired
          type="text"
          id="name"
          name="name"
          aria-describedby="name"
          value={name}
          onChange={(_, event) => {
            handleChange({
              name: event.currentTarget.value,
            });
          }}
          isDisabled={showActions}
        />
      </FormGroup>
      <FormGroup label="Descripción" fieldId="description">
        <TextArea
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(_, event) =>
            handleChange({
              description: event.currentTarget.value,
            })
          }
        />
      </FormGroup>
      {showActions && (
        <ActionGroup>
          <Button variant={ButtonVariant.primary} onClick={onSave}>
            Guardar
          </Button>
          <Button variant={ButtonVariant.link} onClick={onCancel}>
            Cancelar
          </Button>
        </ActionGroup>
      )}
    </Form>
  );
};
