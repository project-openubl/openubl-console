import React, { useState } from "react";
import { Wizard, WizardStep } from "@patternfly/react-core";
import { OrganizationFormData } from "../../models/ui";
import { OrganizationInfoForm } from "../../PresentationalComponents/OrganizationDetailsForm/OrganizationInfoForm";
import { LegalEntityForm } from "../../PresentationalComponents/OrganizationDetailsForm/LegalEntityForm";
import { AddressForm } from "../../PresentationalComponents/OrganizationDetailsForm/AddressForm";
import { ContactForm } from "../../PresentationalComponents/OrganizationDetailsForm/ContactForm";
import SunatForm from "../SunatForm";
import { OrganizationReviewForm } from "../OrganizationReviewForm/OrganizationReviewForm";
import { AppRouterProps } from "../../models/routerProps";
import { OrganizationRepresentation } from "../../models/api";
import { AlertModel } from "../../models/alert";

interface StateToProps {}

interface DispatchToProps {
  createOrganization: (
    organization: OrganizationRepresentation
  ) => Promise<void>;
  addAlert: (alert: AlertModel) => void;
}

export interface Props extends StateToProps, DispatchToProps, AppRouterProps {}

export const CreateOrganizationWizard: React.FC<Props> = ({
  history: { push },
  addAlert,
  createOrganization,
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
      useMasterKeys: false,
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
        address: {
          ubigeo: formData.legalEntityAddress?.ubigeo || "",
          codigoLocal: formData.legalEntityAddress?.codigoLocal,
          urbanizacion: formData.legalEntityAddress?.urbanizacion,
          provincia: formData.legalEntityAddress?.provincia,
          departamento: formData.legalEntityAddress?.departamento,
          distrito: formData.legalEntityAddress?.distrito,
          direccion: formData.legalEntityAddress?.direccion,
          codigoPais: formData.legalEntityAddress?.codigoPais,
        },
        contact: {
          telefono: formData.legalEntityContact?.telefono,
          email: formData.legalEntityContact?.email,
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
        <SunatForm formData={formData} onHandleChange={handleSunatChange} />
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
