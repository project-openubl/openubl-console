import React, { useState } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import { OrganizationFormData, LegalEntityFormData } from "../../../models/ui";
import { notEmpty, size, pattern } from "../../../utils/validation";
import { getValidated } from "../../../utils/forms";

export interface LegalEntityFormProps {
  formData: OrganizationFormData;
  onHandleChange: (data: OrganizationFormData, isValid: boolean) => void;
  showActions?: boolean;
  disableActions?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export const LegalEntityForm: React.FC<LegalEntityFormProps> = ({
  formData,
  onHandleChange,
  showActions,
  disableActions,
  onSave,
  onCancel,
}) => {
  const [dirty, setDirty] = useState<LegalEntityFormData>({});

  const legalEntityInfo: LegalEntityFormData = {
    ruc: formData.legalEntityInfo?.ruc || "",
    razonSocial: formData.legalEntityInfo?.razonSocial || "",
    nombreComercial: formData.legalEntityInfo?.nombreComercial || "",
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

    const isRucValid =
      notEmpty(data.ruc) &&
      size(data.ruc, 11, 11) &&
      pattern(data.ruc, new RegExp("^[0-9]+$"));
    const isRazonSocialValid = notEmpty(data.razonSocial);

    const isFormValid = isRucValid && isRazonSocialValid;
    onHandleChange({ legalEntityInfo: data }, isFormValid);
    setDirty({ ...dirty, ...values });
  };

  return (
    <Form>
      <FormGroup
        label="RUC"
        isRequired
        fieldId="ruc"
        validated={getValidated(
          notEmpty(ruc) &&
            size(ruc, 11, 11) &&
            pattern(ruc, new RegExp("^[0-9]+$")),
          dirty.ruc
        )}
        helperTextInvalid="Ingrese un valor válido"
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
        validated={getValidated(notEmpty(razonSocial), dirty.razonSocial)}
        helperTextInvalid="Ingrese un valor válido"
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
