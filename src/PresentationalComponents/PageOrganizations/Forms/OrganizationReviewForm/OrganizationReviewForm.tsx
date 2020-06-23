import React from "react";
import { Stack, StackItem, Grid, GridItem } from "@patternfly/react-core";
import { OrganizationFormData } from "../../../../models/ui";

export interface OrganizationReviewFormProps {
  formData: OrganizationFormData;
}

export const OrganizationReviewForm: React.FC<OrganizationReviewFormProps> = ({
  formData,
}) => {
  return (
    <React.Fragment>
      <Stack hasGutter={true}>
        <StackItem className="pf-c-content">
          <section>
            <h2>Organización</h2>
            <dl>
              <dt>Nombre</dt>
              <dd>{formData.name}</dd>
              {formData.description && (
                <React.Fragment>
                  <dt>Descripción</dt>
                  <dd>{formData.description}</dd>
                </React.Fragment>
              )}
            </dl>
          </section>
        </StackItem>
        <StackItem className="pf-c-content">
          <Grid hasGutter lg={6}>
            <GridItem>
              <section>
                <h2>Persona jurídica</h2>
                <dl>
                  <dt>RUC</dt>
                  <dd>{formData.legalEntityInfo?.ruc}</dd>
                  <dt>Razón social</dt>
                  <dd>{formData.legalEntityInfo?.razonSocial}</dd>
                  {formData.legalEntityInfo?.nombreComercial && (
                    <React.Fragment>
                      <dt>Nombre comercial</dt>
                      <dd>{formData.legalEntityInfo?.nombreComercial}</dd>
                    </React.Fragment>
                  )}
                </dl>
              </section>
            </GridItem>
            {(formData.legalEntityContact?.telefono ||
              formData.legalEntityContact?.email) && (
              <GridItem>
                <section>
                  <h2>Contacto</h2>
                  <dl>
                    {formData.legalEntityContact?.telefono && (
                      <React.Fragment>
                        <dt>Teléfono</dt>
                        <dd>{formData.legalEntityContact?.telefono}</dd>
                      </React.Fragment>
                    )}
                    {formData.legalEntityContact?.email && (
                      <React.Fragment>
                        <dt>Email</dt>
                        <dd>{formData.legalEntityContact?.email}</dd>
                      </React.Fragment>
                    )}
                  </dl>
                </section>
              </GridItem>
            )}
          </Grid>
        </StackItem>
        <StackItem className="pf-c-content">
          <section>
            <h2>Dirección</h2>
            <Grid hasGutter lg={6}>
              <GridItem>
                <dl>
                  <dt>Ubigeo</dt>
                  <dd>{formData.legalEntityAddress?.ubigeo}</dd>
                  {formData.legalEntityAddress?.departamento && (
                    <React.Fragment>
                      <dt>Departamento</dt>
                      <dd>{formData.legalEntityAddress?.departamento}</dd>
                    </React.Fragment>
                  )}
                  {formData.legalEntityAddress?.provincia && (
                    <React.Fragment>
                      <dt>Provincia</dt>
                      <dd>{formData.legalEntityAddress?.provincia}</dd>
                    </React.Fragment>
                  )}
                  {formData.legalEntityAddress?.distrito && (
                    <React.Fragment>
                      <dt>Distrito</dt>
                      <dd>{formData.legalEntityAddress?.distrito}</dd>
                    </React.Fragment>
                  )}
                </dl>
              </GridItem>
              <GridItem>
                <dl>
                  {formData.legalEntityAddress?.direccion && (
                    <React.Fragment>
                      <dt>Dirección</dt>
                      <dd>{formData.legalEntityAddress?.direccion}</dd>
                    </React.Fragment>
                  )}
                  {formData.legalEntityAddress?.urbanizacion && (
                    <React.Fragment>
                      <dt>Urbanizacion</dt>
                      <dd>{formData.legalEntityAddress?.urbanizacion}</dd>
                    </React.Fragment>
                  )}
                  {formData.legalEntityAddress?.codigoLocal && (
                    <React.Fragment>
                      <dt>Código local</dt>
                      <dd>{formData.legalEntityAddress?.codigoLocal}</dd>
                    </React.Fragment>
                  )}
                  {formData.legalEntityAddress?.codigoPais && (
                    <React.Fragment>
                      <dt>Código país</dt>
                      <dd>{formData.legalEntityAddress?.codigoPais}</dd>
                    </React.Fragment>
                  )}
                </dl>
              </GridItem>
            </Grid>
          </section>
        </StackItem>
        <StackItem className="pf-c-content">
          <section>
            <h2>Servicios web</h2>
            <dl>
              <dt>Usuario</dt>
              <dd>{formData.webServices?.sunatUsername}</dd>
              <dt>Contraseña</dt>
              <dd>******</dd>
              <dt>Factura</dt>
              <dd>{formData.webServices?.sunatUrlFactura}</dd>
              <dt>Guía remisión</dt>
              <dd>{formData.webServices?.sunatUrlGuiaRemision}</dd>
              <dt>Percepción retención</dt>
              <dd>{formData.webServices?.sunatUrlPercepcionRetencion}</dd>
            </dl>
          </section>
        </StackItem>
      </Stack>
    </React.Fragment>
  );
};
