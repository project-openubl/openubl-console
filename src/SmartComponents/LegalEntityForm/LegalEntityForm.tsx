import React, { useState } from "react";
import {
  TextContent,
  Text,
  Form,
  FormGroup,
  TextInput,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { OrganizationFormData, LegalEntityFormData } from "../../models/ui";
import { validRUC, validString } from "../../utils/validation";
import { getValidated } from "../../utils/forms";

export interface LegalEntityFormProps {
  formData: OrganizationFormData;
  onHandleChange: (data: OrganizationFormData, isValid: boolean) => void;
}

export const LegalEntityForm: React.FC<LegalEntityFormProps> = ({
  formData,
  onHandleChange,
}) => {
  const [dirty, setDirty] = useState<LegalEntityFormData>({});

  const legalEntityInfo: LegalEntityFormData = formData.legalEntityInfo || {
    ruc: "",
    razonSocial: "",
    nombreComercial: "",
  };
  const { ruc, razonSocial, nombreComercial } = legalEntityInfo;

  const getFormValues = (values: LegalEntityFormData) => {
    return {
      ruc,
      razonSocial,
      nombreComercial,
      ...values,
    };
  };

  const handleChange = (values: LegalEntityFormData) => {
    const data = getFormValues(values);
    const isFormValid = validRUC(data.ruc) && validString(data.razonSocial);
    onHandleChange({ legalEntityInfo: data }, isFormValid);
    setDirty({ ...dirty, ...values });
  };

  return (
    <React.Fragment>
      <Stack hasGutter={true}>
        <StackItem>
          <TextContent>
            <Text component="h1">Persona jurídica</Text>
          </TextContent>
        </StackItem>
        <StackItem>
          <Form>
            <FormGroup
              label="RUC"
              isRequired
              fieldId="ruc"
              validated={getValidated(validRUC(ruc), dirty.ruc)}
              helperTextInvalid="Ingrese un RUC válido"
            >
              <TextInput
                isRequired
                type="text"
                id="ruc"
                name="ruc"
                aria-describedby="ruc"
                value={ruc}
                onChange={(_, event) =>
                  handleChange({
                    ruc: event.currentTarget.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup
              label="Razón social"
              isRequired
              fieldId="razonSocial"
              validated={getValidated(
                validString(razonSocial),
                dirty.razonSocial
              )}
              helperTextInvalid="Ingrese una Razón social válida"
            >
              <TextInput
                isRequired
                type="text"
                id="razonSocial"
                name="razonSocial"
                aria-describedby="razonSocial"
                value={razonSocial}
                onChange={(_, event) =>
                  handleChange({ razonSocial: event.currentTarget.value })
                }
              />
            </FormGroup>
            <FormGroup
              label="Nombre comercial"
              isRequired={false}
              fieldId="nombreComercial"
            >
              <TextInput
                isRequired
                type="text"
                id="nombreComercial"
                name="nombreComercial"
                aria-describedby="nombreComercial"
                value={nombreComercial}
                onChange={(_, event) =>
                  handleChange({
                    nombreComercial: event.currentTarget.value,
                  })
                }
              />
            </FormGroup>
          </Form>
        </StackItem>
      </Stack>
    </React.Fragment>
  );
};
