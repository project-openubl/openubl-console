import React, { useState, useEffect } from "react";
import { Wizard, WizardStep } from "@patternfly/react-core";
import { AxiosError } from "axios";
import { OrganizationFormData } from "../../../models/ui";
import { OrganizationInfoForm } from "../../../PresentationalComponents/PageOrganizations/Forms/OrganizationInfoForm";
import { LegalEntityForm } from "../../../PresentationalComponents/PageOrganizations/Forms/LegalEntityForm";
import { AddressForm } from "../../../PresentationalComponents/PageOrganizations/Forms/AddressForm";
import { ContactForm } from "../../../PresentationalComponents/PageOrganizations/Forms/ContactForm";
import { OrganizationReviewForm } from "../../../PresentationalComponents/PageOrganizations/Forms/OrganizationReviewForm/OrganizationReviewForm";
import { AppRouterProps } from "../../../models/routerProps";
import {
  OrganizationRepresentation,
  WSTemplateRepresentation,
} from "../../../models/api";
import { AlertModel } from "../../../models/alert";
import { FetchStatus } from "../../../store/common";
import { SunatForm } from "../../../PresentationalComponents/PageOrganizations/Forms/SunatForm";

interface StateToProps {
  wsTemplates: WSTemplateRepresentation[] | undefined;
  wsTemplatesError: AxiosError | undefined;
  wsTemplatesFetchStatus: FetchStatus;
}

interface DispatchToProps {
  createOrganization: (
    organization: OrganizationRepresentation
  ) => Promise<void>;
  addAlert: (alert: AlertModel) => void;
  fetchAllTemplates: () => Promise<void>;
}

export interface Props extends StateToProps, DispatchToProps, AppRouterProps {}

export const CreateOrganization: React.FC<Props> = ({
  history: { push },
  addAlert,
  createOrganization,
  wsTemplates,
  fetchAllTemplates,
}) => {
  const [formData, setValues] = useState<OrganizationFormData>({});
  const [
    isOrganizationInfoFormValid,
    setIsOrganizationInfoFormValid,
  ] = useState(false);
  const [isLegalEntityFormValid, setIsLegalEntityFormValid] = useState(false);
  const [isAddressFormValid, setIsAddressFormValid] = useState(true);
  const [isContactFormValid, setIsContactFormValid] = useState(true);
  const [isSunatFormValid, setIsSunatFormValid] = useState(false);
  const [stepIdReached, setStepIdReached] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!wsTemplates) {
      fetchAllTemplates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (data: OrganizationFormData) => {
    setValues({ ...formData, ...data });
  };

  const handleOrganizationInfoChange = (data: OrganizationFormData) => {
    handleChange(data);
  };

  const handleLegalEntityChange = (
    data: OrganizationFormData,
    isValid: boolean
  ) => {
    handleChange(data);
    setIsLegalEntityFormValid(isValid);
  };

  const handleAddressChange = (
    data: OrganizationFormData,
    isValid: boolean
  ) => {
    handleChange(data);
    setIsAddressFormValid(isValid);
  };

  const handleContactChange = (
    data: OrganizationFormData,
    isValid: boolean
  ) => {
    handleChange(data);
    setIsContactFormValid(isValid);
  };

  const handleSunatChange = (data: OrganizationFormData, isValid: boolean) => {
    handleChange(data);
    setIsSunatFormValid(isValid);
  };

  const onWizardNext = (newStep: any) => {
    const { id } = newStep;
    const step = stepIdReached < id ? id : stepIdReached;
    setStepIdReached(step);
  };

  const onSubmit = async () => {
    const organizationData: OrganizationRepresentation = {
      id: "",
      name: formData.name || "",
      description: formData.description || "",
      type: "",
      useCustomCertificates: true,
      settings: {
        ruc: formData.legalEntityInfo?.ruc || "",
        razonSocial: formData.legalEntityInfo?.razonSocial || "",
        nombreComercial: formData.legalEntityInfo?.nombreComercial || "",
        sunatUsername: formData.webServices?.sunatUsername || "",
        sunatPassword: formData.webServices?.sunatPassword || "",
        sunatUrlFactura: formData.webServices?.sunatUrlFactura || "",
        sunatUrlGuiaRemision: formData.webServices?.sunatUrlGuiaRemision || "",
        sunatUrlPercepcionRetencion:
          formData.webServices?.sunatUrlPercepcionRetencion || "",
        domicilioFiscal: {
          ubigeo: formData.legalEntityAddress?.ubigeo || undefined,
          codigoLocal: formData.legalEntityAddress?.codigoLocal || undefined,
          urbanizacion: formData.legalEntityAddress?.urbanizacion || undefined,
          provincia: formData.legalEntityAddress?.provincia || undefined,
          departamento: formData.legalEntityAddress?.departamento || undefined,
          distrito: formData.legalEntityAddress?.distrito || undefined,
          direccion: formData.legalEntityAddress?.direccion || undefined,
          codigoPais: formData.legalEntityAddress?.codigoPais || undefined,
        },
        contacto: {
          telefono: formData.legalEntityContact?.telefono || undefined,
          email: formData.legalEntityContact?.email || undefined,
        },
      },
    };

    await createOrganization(organizationData);
  };

  const onCancel = () => {
    addAlert({
      variant: "warning",
      title: "Operación cancelada",
      description:
        "La creación de la organización fue cancelada por el usuario",
      dismissDelay: 8000,
      dismissable: false,
    });
    push("/");
  };

  const steps: WizardStep[] = [
    {
      id: 1,
      name: "Datos generales",
      canJumpTo: stepIdReached >= 1,
      component: (
        <OrganizationInfoForm
          formData={formData}
          onHandleChange={handleOrganizationInfoChange}
          setIsOrganizationInfoFormValid={setIsOrganizationInfoFormValid}
        />
      ),
      enableNext: isOrganizationInfoFormValid,
    },
    {
      name: "Tu empresa",
      steps: [
        {
          id: 2,
          name: "Persona jurídica",
          canJumpTo: stepIdReached >= 2 && isOrganizationInfoFormValid,
          component: (
            <LegalEntityForm
              formData={formData}
              onHandleChange={handleLegalEntityChange}
            />
          ),
          enableNext: isLegalEntityFormValid,
        },
        {
          id: 3,
          name: "Dirección",
          canJumpTo:
            stepIdReached >= 3 &&
            isOrganizationInfoFormValid &&
            isLegalEntityFormValid,
          component: (
            <AddressForm
              formData={formData}
              onHandleChange={handleAddressChange}
            />
          ),
          enableNext: isAddressFormValid,
        },
        {
          id: 4,
          name: "Contacto",
          canJumpTo:
            stepIdReached >= 4 &&
            isOrganizationInfoFormValid &&
            isLegalEntityFormValid &&
            isAddressFormValid,
          component: (
            <ContactForm
              formData={formData}
              onHandleChange={handleContactChange}
            />
          ),
          enableNext: isContactFormValid,
        },
      ],
    },
    {
      id: 5,
      name: "SUNAT",
      canJumpTo:
        stepIdReached >= 5 &&
        isOrganizationInfoFormValid &&
        isLegalEntityFormValid &&
        isAddressFormValid &&
        isContactFormValid,
      component: (
        <SunatForm
          formData={formData}
          onHandleChange={handleSunatChange}
          wsTemplates={wsTemplates}
        />
      ),
      enableNext: isSunatFormValid,
    },
    {
      id: 6,
      name: "Revisar",
      component: <OrganizationReviewForm formData={formData} />,
      nextButtonText: "Crear organización",
    },
  ];

  return (
    <Wizard
      onClose={() => {
        onCancel();
      }}
      onSave={async () => {
        setIsSubmitting(true);
        if (!isSubmitting) {
          await onSubmit();
          setIsSubmitting(false);
          push("/");
        }
      }}
      steps={steps}
      onNext={onWizardNext}
    />
  );
};
