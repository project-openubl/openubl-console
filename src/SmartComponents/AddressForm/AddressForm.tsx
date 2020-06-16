import React, { useState } from "react";
import {
  TextContent,
  Text,
  Form,
  FormGroup,
  TextInput,
  Stack,
  StackItem,
  Grid,
  GridItem,
} from "@patternfly/react-core";
import {
  OrganizationFormData,
  LegalEntityAddressFormData,
} from "../../models/ui";
import { validUbigeo } from "../../utils/validation";
import { getValidated } from "../../utils/forms";

export interface AddressFormProps {
  formData: OrganizationFormData;
  onHandleChange: (data: OrganizationFormData, isValid: boolean) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  onHandleChange,
}) => {
  const [dirty, setDirty] = useState<LegalEntityAddressFormData>({});

  const address: LegalEntityAddressFormData = formData.legalEntityAddress || {
    ubigeo: "",
    departamento: "",
    provincia: "",
    distrito: "",
    urbanizacion: "",
    codigoLocal: "",
    direccion: "",
    codigoPais: "",
  };
  const {
    ubigeo,
    departamento,
    provincia,
    distrito,
    urbanizacion,
    codigoLocal,
    direccion,
    codigoPais,
  } = address;

  const getFormValues = (values: LegalEntityAddressFormData) => {
    return {
      ubigeo,
      departamento,
      provincia,
      distrito,
      urbanizacion,
      codigoLocal,
      direccion,
      codigoPais,
      ...values,
    };
  };

  const handleChange = (values: LegalEntityAddressFormData) => {
    const data = getFormValues(values);
    const isFormValid = validUbigeo(data.ubigeo);
    onHandleChange({ legalEntityAddress: data }, isFormValid);
    setDirty({ ...dirty, ...values });
  };

  return (
    <React.Fragment>
      <Stack hasGutter={true}>
        <StackItem>
          <TextContent>
            <Text component="h1">Dirección legal</Text>
          </TextContent>
        </StackItem>
        <StackItem>
          <Form>
            <Grid hasGutter lg={4}>
              <GridItem>
                <FormGroup
                  label="Código ubigeo"
                  isRequired
                  fieldId="ubigeo"
                  validated={getValidated(validUbigeo(ubigeo), dirty.ubigeo)}
                  helperTextInvalid="Ubigeo inválido"
                >
                  <TextInput
                    isRequired
                    type="text"
                    id="ubigeo"
                    name="ubigeo"
                    aria-describedby="ubigeo"
                    value={ubigeo}
                    onChange={(_, event) =>
                      handleChange({
                        ubigeo: event.currentTarget.value,
                      })
                    }
                  />
                </FormGroup>
              </GridItem>
              <GridItem span={8}>
                <FormGroup
                  label="Dirección"
                  isRequired={false}
                  fieldId="direccion"
                  helperTextInvalid="Campo inválido"
                >
                  <TextInput
                    isRequired
                    type="text"
                    id="direccion"
                    name="direccion"
                    aria-describedby="direccion"
                    value={direccion}
                    onChange={(_, event) =>
                      handleChange({ direccion: event.currentTarget.value })
                    }
                  />
                </FormGroup>
              </GridItem>
            </Grid>
            <Grid hasGutter lg={4}>
              <GridItem>
                <FormGroup
                  label="Departamento"
                  isRequired={false}
                  fieldId="departamento"
                  helperTextInvalid="Campo inválido"
                >
                  <TextInput
                    isRequired
                    type="text"
                    id="departamento"
                    name="departamento"
                    aria-describedby="departamento"
                    value={departamento}
                    onChange={(_, event) =>
                      handleChange({ departamento: event.currentTarget.value })
                    }
                  />
                </FormGroup>
              </GridItem>
              <GridItem>
                <FormGroup
                  label="Provincia"
                  isRequired={false}
                  fieldId="provincia"
                  helperTextInvalid="Campo inválido"
                >
                  <TextInput
                    isRequired
                    type="text"
                    id="provincia"
                    name="provincia"
                    aria-describedby="provincia"
                    value={provincia}
                    onChange={(_, event) =>
                      handleChange({ provincia: event.currentTarget.value })
                    }
                  />
                </FormGroup>
              </GridItem>
              <GridItem>
                <FormGroup
                  label="Distrito"
                  isRequired={false}
                  fieldId="distrito"
                  helperTextInvalid="Campo inválido"
                >
                  <TextInput
                    isRequired
                    type="text"
                    id="distrito"
                    name="distrito"
                    aria-describedby="distrito"
                    value={distrito}
                    onChange={(_, event) =>
                      handleChange({ distrito: event.currentTarget.value })
                    }
                  />
                </FormGroup>
              </GridItem>
            </Grid>
            <FormGroup
              label="Urbanización"
              isRequired={false}
              fieldId="urbanizacion"
              helperTextInvalid="Campo inválido"
            >
              <TextInput
                isRequired
                type="text"
                id="urbanizacion"
                name="urbanizacion"
                aria-describedby="urbanizacion"
                value={urbanizacion}
                onChange={(_, event) =>
                  handleChange({ urbanizacion: event.currentTarget.value })
                }
              />
            </FormGroup>
            <FormGroup
              label="Código local"
              isRequired={false}
              fieldId="codigoLocal"
              helperTextInvalid="Campo inválido"
            >
              <TextInput
                isRequired
                type="text"
                id="codigoLocal"
                name="codigoLocal"
                aria-describedby="codigoLocal"
                value={codigoLocal}
                onChange={(_, event) =>
                  handleChange({ codigoLocal: event.currentTarget.value })
                }
              />
            </FormGroup>
            <Grid hasGutter lg={4}>
              <GridItem>
                <FormGroup
                  label="Código país"
                  isRequired={false}
                  fieldId="codigoPais"
                  helperTextInvalid="Campo inválido"
                >
                  <TextInput
                    isRequired
                    type="text"
                    id="codigoPais"
                    name="codigoPais"
                    aria-describedby="codigoPais"
                    value={codigoPais}
                    onChange={(_, event) =>
                      handleChange({ codigoPais: event.currentTarget.value })
                    }
                  />
                </FormGroup>
              </GridItem>
            </Grid>
          </Form>
        </StackItem>
      </Stack>
    </React.Fragment>
  );
};
