import { Transition } from "@headlessui/react";
import {
  ContactInfoColumn,
  SectionTitle,
  FormGroup,
  InputLabel,
  RequiredMark,
  Input,
  TextArea,
  DropdownContainer,
  DropdownItem,
} from "../../homepage/quote-request/quote-request-form.styled";

export function ContactSection({ t, register, errors }) {
  return (
    <ContactInfoColumn>
      <SectionTitle>{t("contact.title")}</SectionTitle>
      <FormGroup>
        <InputLabel htmlFor="name">
          {t("contact.name")} <RequiredMark>*</RequiredMark>
        </InputLabel>
        <Input
          id="name"
          type="text"
          hasError={errors.name}
          {...register("name", { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="email">
          {t("contact.email")} <RequiredMark>*</RequiredMark>
        </InputLabel>
        <Input
          id="email"
          type="email"
          hasError={errors.email}
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="phone">{t("contact.phone")}</InputLabel>
        <Input id="phone" type="tel" {...register("phone")} />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="message">
          {t("contact.message")} <RequiredMark>*</RequiredMark>
        </InputLabel>
        <TextArea
          id="message"
          rows={5}
          hasError={errors.message}
          {...register("message", { required: true })}
        />
      </FormGroup>
    </ContactInfoColumn>
  );
}

export function Dropdown({ isOpen, options, onSelect }) {
  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <DropdownContainer>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownContainer>
    </Transition>
  );
}
