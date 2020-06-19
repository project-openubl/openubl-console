import React, { useState } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import {
  OrganizationFormData,
  LegalEntityContactFormData,
} from "../../../models/ui";
import { validEmail } from "../../../utils/validation";
import { getValidated } from "../../../utils/forms";

export interface WebServicesFormProps {
  formData: OrganizationFormData;
  onHandleChange: (data: OrganizationFormData, isValid: boolean) => void;
  showActions?: boolean;
  disableActions?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export const ContactForm: React.FC<WebServicesFormProps> = ({
  formData,
  onHandleChange,
  showActions,
  disableActions,
  onSave,
  onCancel,
}) => {
  const [dirty, setDirty] = useState<LegalEntityContactFormData>({});

  const contact: LegalEntityContactFormData = {
    email: formData.legalEntityContact?.email || "",
    telefono: formData.legalEntityContact?.telefono || "",
  };
  const { email, telefono } = contact;

  const getFormValues = (values: LegalEntityContactFormData) => {
    return {
      email,
      telefono,
      ...values,
    };
  };

  const handleChange = (values: LegalEntityContactFormData) => {
    const data = getFormValues(values);
    const isFormValid = validEmail(data.email);
    onHandleChange({ legalEntityContact: data }, isFormValid);
    setDirty({ ...dirty, ...values });
  };

  return (
    <Form>
      <FormGroup label="Teléfono" isRequired={false} fieldId="telefono">
        <TextInput
          type="text"
          id="telefono"
          name="telefono"
          aria-describedby="telefono"
          value={telefono}
          onChange={(_, event) =>
            handleChange({
              telefono: event.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <FormGroup
        label="Email"
        isRequired={false}
        fieldId="email"
        validated={getValidated(validEmail(email), dirty.email)}
        helperTextInvalid="Ingrese un valor válido"
      >
        <TextInput
          type="text"
          id="email"
          name="email"
          aria-describedby="email"
          value={email}
          onChange={(_, event) =>
            handleChange({
              email: event.currentTarget.value,
            })
          }
        />
      </FormGroup>
      {showActions && (
        <ActionGroup>
          <Button
            variant={ButtonVariant.primary}
            onClick={onSave}
            isDisabled={disableActions}
          >
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
