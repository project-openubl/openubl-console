import React, { useState } from "react";
import {
  TextContent,
  Text,
  Form,
  FormGroup,
  TextInput,
  Stack,
  StackItem,
  Button,
  Flex,
  FlexItem,
  ActionGroup,
  ButtonVariant,
} from "@patternfly/react-core";
import { CloneIcon } from "@patternfly/react-icons";
import { validURL, validString } from "../../../utils/validation";
import { WSTemplateRepresentation } from "../../../models/api";
import { OrganizationFormData, WebServicesFormData } from "../../../models/ui";
import { getValidated } from "../../../utils/forms";

export interface SunatFormProps {
  formData: OrganizationFormData;
  onHandleChange: (data: OrganizationFormData, isValid: boolean) => void;
  wsTemplates: WSTemplateRepresentation[] | undefined;
  showActions?: boolean;
  disableActions?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export const SunatForm: React.FC<SunatFormProps> = ({
  formData,
  onHandleChange,
  wsTemplates,
  showActions,
  disableActions,
  onSave,
  onCancel,
}) => {
  const webServices: WebServicesFormData = formData.webServices || {
    sunatUsername: "",
    sunatPassword: "",
    sunatUrlFactura: "",
    sunatUrlGuiaRemision: "",
    sunatUrlPercepcionRetencion: "",
  };
  const {
    sunatUsername,
    sunatPassword,
    sunatUrlFactura,
    sunatUrlGuiaRemision,
    sunatUrlPercepcionRetencion,
  } = webServices;

  const [dirty, setDirty] = useState<WebServicesFormData>({});

  const getFormValues = (values: WebServicesFormData) => {
    return {
      sunatUsername,
      sunatPassword,
      sunatUrlFactura,
      sunatUrlGuiaRemision,
      sunatUrlPercepcionRetencion,
      ...values,
    };
  };

  const handleChange = (values: WebServicesFormData) => {
    const data = getFormValues(values);
    const isFormValid =
      validString(data.sunatUsername) &&
      validString(data.sunatPassword) &&
      validURL(data.sunatUrlFactura) &&
      validURL(data.sunatUrlGuiaRemision) &&
      validURL(data.sunatUrlPercepcionRetencion);
    onHandleChange({ webServices: data }, isFormValid);
    setDirty({ ...dirty, ...values });
  };

  return (
    <React.Fragment>
      <Form>
        <Stack hasGutter={true}>
          <StackItem>
            <TextContent>
              <Text component="h2">Servicios Web</Text>
            </TextContent>
          </StackItem>
          {wsTemplates && (
            <StackItem>
              <Flex>
                {wsTemplates.map((option, index) => (
                  <FlexItem key={index}>
                    <Button
                      type="button"
                      variant="tertiary"
                      icon={<CloneIcon />}
                      onClick={() => {
                        handleChange({
                          ...webServices,
                          sunatUrlFactura: option.sunatUrlFactura,
                          sunatUrlGuiaRemision: option.sunatUrlGuiaRemision,
                          sunatUrlPercepcionRetencion:
                            option.sunatUrlPercepcionRetencion,
                        });
                      }}
                    >
                      {option.name}
                    </Button>
                  </FlexItem>
                ))}
              </Flex>
            </StackItem>
          )}
          <StackItem>
            <FormGroup
              label="Factura"
              isRequired
              fieldId="sunatUrlFactura"
              validated={getValidated(
                validURL(sunatUrlFactura),
                dirty.sunatUrlFactura
              )}
              helperTextInvalid="URL inválida"
            >
              <TextInput
                isRequired
                type="text"
                id="sunatUrlFactura"
                name="sunatUrlFactura"
                aria-describedby="sunatUrlFactura"
                value={sunatUrlFactura}
                onChange={(_, event) =>
                  handleChange({
                    sunatUrlFactura: event.currentTarget.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup
              label="Guía remisión"
              isRequired
              fieldId="sunatUrlGuiaRemision"
              validated={getValidated(
                validURL(sunatUrlGuiaRemision),
                dirty.sunatUrlGuiaRemision
              )}
              helperTextInvalid="URL inválida"
            >
              <TextInput
                isRequired
                type="text"
                id="sunatUrlGuiaRemision"
                name="sunatUrlGuiaRemision"
                aria-describedby="sunatUrlGuiaRemision"
                value={sunatUrlGuiaRemision}
                onChange={(_, event) =>
                  handleChange({
                    sunatUrlGuiaRemision: event.currentTarget.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup
              label="Percepción y retención"
              isRequired
              fieldId="sunatUrlPercepcionRetencion"
              validated={getValidated(
                validURL(sunatUrlPercepcionRetencion),
                dirty.sunatUrlPercepcionRetencion
              )}
              helperTextInvalid="URL inválida"
            >
              <TextInput
                isRequired
                type="text"
                id="sunatUrlPercepcionRetencion"
                name="sunatUrlPercepcionRetencion"
                aria-describedby="sunatUrlPercepcionRetencion"
                value={sunatUrlPercepcionRetencion}
                onChange={(_, event) =>
                  handleChange({
                    sunatUrlPercepcionRetencion: event.currentTarget.value,
                  })
                }
              />
            </FormGroup>
          </StackItem>
          <StackItem>
            <TextContent>
              <Text component="h2">Credenciales</Text>
            </TextContent>
          </StackItem>
          <StackItem>
            <FormGroup
              label="Usuario"
              isRequired
              fieldId="sunatUsername"
              validated={getValidated(
                validString(sunatUsername),
                dirty.sunatUsername
              )}
              helperTextInvalid="Ingrese in valor válido"
            >
              <TextInput
                isRequired
                type="text"
                id="sunatUsername"
                name="sunatUsername"
                aria-describedby="sunatUsername"
                value={sunatUsername}
                onChange={(_, event) =>
                  handleChange({
                    sunatUsername: event.currentTarget.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup
              label="Contraseña"
              isRequired
              fieldId="sunatPassword"
              validated={getValidated(
                validString(sunatPassword),
                dirty.sunatPassword
              )}
              helperTextInvalid="Ingrese un valor válido"
            >
              <TextInput
                isRequired
                type="password"
                id="sunatPassword"
                name="sunatPassword"
                aria-describedby="sunatPassword"
                value={sunatPassword}
                onChange={(_, event) =>
                  handleChange({
                    sunatPassword: event.currentTarget.value,
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
          </StackItem>
        </Stack>
      </Form>
    </React.Fragment>
  );
};
