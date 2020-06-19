import React, { useState } from "react";
import { Form, FormGroup, TextInput } from "@patternfly/react-core";
import {
  OrganizationFormData,
  LegalEntityContactFormData,
} from "../../models/ui";
import { validEmail } from "../../utils/validation";
import { getValidated } from "../../utils/forms";

export interface WebServicesFormProps {
  formData: OrganizationFormData;
  onHandleChange: (data: OrganizationFormData, isValid: boolean) => void;
}

export const ContactForm: React.FC<WebServicesFormProps> = ({
  formData,
  onHandleChange,
}) => {
  const [dirty, setDirty] = useState<LegalEntityContactFormData>({});

  const contact: LegalEntityContactFormData = formData.legalEntityContact || {
    email: "",
    telefono: "",
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
    const isFormValid = data.email === "" || validEmail(data.email);
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
        validated={getValidated(email === "" || validEmail(email), dirty.email)}
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
    </Form>
  );
};
