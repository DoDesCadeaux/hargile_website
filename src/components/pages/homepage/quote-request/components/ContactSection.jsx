import {Transition} from "@headlessui/react";
import {
    ContactInfoColumn,
    DropdownContainer,
    DropdownItem,
    FormGroup,
    Input,
    InputLabel,
    RequiredMark,
    SectionTitle,
    TextArea,
} from "../quote-request-form.styled";
import {useDropdown} from "./useDropdown";

export function ContactSection({t, register, errors, setValue, watch}) {
    const {isOpen: isBudgetOpen, toggle: toggleBudgetDropdown} = useDropdown();

    const {isOpen: isTimelineOpen, toggle: toggleTimelineDropdown} =
        useDropdown();

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
                    {...register("name", {required: true})}
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
                <InputLabel htmlFor="object">{t("contact.object")}</InputLabel>
                <Input id="object" type="text" {...register("object")} />
            </FormGroup>

            <FormGroup>
                <InputLabel htmlFor="description">
                    {t("contact.projectDescription")} <RequiredMark>*</RequiredMark>
                </InputLabel>
                <TextArea
                    id="description"
                    rows={5}
                    hasError={errors.description}
                    {...register("description", {required: true})}
                />
            </FormGroup>

            {/*<FormGroup className="grid-cols-2">*/}
            {/*  <div>*/}
            {/*    <InputLabel htmlFor="budget">{t("contact.budget.label")}</InputLabel>*/}
            {/*    <div className="relative">*/}
            {/*      <SelectButton*/}
            {/*        type="button"*/}
            {/*        hasError={errors.budget}*/}
            {/*        onClick={toggleBudgetDropdown}*/}
            {/*      >*/}
            {/*        <span className="text-content">*/}
            {/*          {watch("budget")*/}
            {/*            ? getLabelFromValue(watch("budget"), "budget", t)*/}
            {/*            : t("contact.budget.select")}*/}
            {/*        </span>*/}

            {/*        <span className="icon">*/}
            {/*          {isBudgetOpen ? (*/}
            {/*            <ChevronUp className="icon-up" />*/}
            {/*          ) : (*/}
            {/*            <ChevronDown className="icon-down" />*/}
            {/*          )}*/}
            {/*        </span>*/}
            {/*      </SelectButton>*/}

            {/*      <Dropdown*/}
            {/*        isOpen={isBudgetOpen}*/}
            {/*        options={[*/}
            {/*          { value: "< 5000", label: t("contact.budget.less5k") },*/}
            {/*          { value: "5000-10000", label: t("contact.budget.5kTo10k") },*/}
            {/*          { value: "10000-25000", label: t("contact.budget.10kTo25k") },*/}
            {/*          { value: "25000-50000", label: t("contact.budget.25kTo50k") },*/}
            {/*          { value: "> 50000", label: t("contact.budget.more50k") },*/}
            {/*        ]}*/}
            {/*        onSelect={(value) => {*/}
            {/*          setValue("budget", value);*/}
            {/*          toggleBudgetDropdown();*/}
            {/*        }}*/}
            {/*      />*/}

            {/*      <input*/}
            {/*        type="hidden"*/}
            {/*        {...register("budget", { required: "Budget is required" })}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    {errors.budget && (*/}
            {/*      <p className="error-message">{errors.budget.message}</p>*/}
            {/*    )}*/}
            {/*  </div>*/}

            {/*  <div>*/}
            {/*    <InputLabel htmlFor="timeline">*/}
            {/*      {t("contact.timeline.label")}*/}
            {/*    </InputLabel>*/}
            {/*    <div className="relative">*/}
            {/*      <SelectButton*/}
            {/*        type="button"*/}
            {/*        hasError={errors.timeline}*/}
            {/*        onClick={toggleTimelineDropdown}*/}
            {/*      >*/}
            {/*        <span className="text-content">*/}
            {/*          {watch("timeline")*/}
            {/*            ? getLabelFromValue(watch("timeline"), "timeline", t)*/}
            {/*            : t("contact.timeline.select")}*/}
            {/*        </span>*/}
            {/*        <span className="icon">*/}
            {/*          {isTimelineOpen ? (*/}
            {/*            <ChevronUp className="icon-up" />*/}
            {/*          ) : (*/}
            {/*            <ChevronDown className="icon-down" />*/}
            {/*          )}*/}
            {/*        </span>*/}
            {/*      </SelectButton>*/}

            {/*      <Dropdown*/}
            {/*        isOpen={isTimelineOpen}*/}
            {/*        options={[*/}
            {/*          { value: "< 1month", label: t("contact.timeline.less1month") },*/}
            {/*          { value: "1-3months", label: t("contact.timeline.1To3months") },*/}
            {/*          { value: "3-6months", label: t("contact.timeline.3To6months") },*/}
            {/*          {*/}
            {/*            value: "> 6months",*/}
            {/*            label: t("contact.timeline.more6months"),*/}
            {/*          },*/}
            {/*        ]}*/}
            {/*        onSelect={(value) => {*/}
            {/*          setValue("timeline", value);*/}
            {/*          toggleTimelineDropdown();*/}
            {/*        }}*/}
            {/*      />*/}

            {/*      <input*/}
            {/*        type="hidden"*/}
            {/*        {...register("timeline", {*/}
            {/*          required: "Timeline is required",*/}
            {/*        })}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    {errors.timeline && (*/}
            {/*      <p className="error-message">{errors.timeline.message}</p>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*</FormGroup>*/}
        </ContactInfoColumn>
    );
}

function Dropdown({isOpen, options, onSelect}) {
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
