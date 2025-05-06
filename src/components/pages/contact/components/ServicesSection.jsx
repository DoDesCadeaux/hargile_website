import styled from "styled-components";
import {Mail, MapPin, Phone} from "lucide-react";
import {SectionTitle, ServiceTypesColumn, SubmitButton,} from "../../homepage/quote-request/quote-request-form.styled";

// Contact Info Card Styled Components
const ContactCardContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 0.75rem;
    background-color: rgba(30, 20, 60, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

const IconCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-right: 1rem;
    background-color: ${(props) => props.bgcolor || "rgba(80, 70, 120, 0.8)"};
    border: 1px solid ${(props) => props.bordercolor || "rgba(100, 90, 140, 0.8)"};
`;

const ContactContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContactTitle = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin: 0 0 0.25rem 0;
`;

const ContactDetail = styled.p`
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
`;

const ContactCardsContainer = styled.div`
    margin: 1.5rem 0;
`;

export function ServicesSection({t}) {
    return (
        <ServiceTypesColumn>
            <SectionTitle>{t("services.title")}</SectionTitle>

            {/* Contact Cards */}
            <ContactCardsContainer>
                <ContactCardContainer>
                    <IconCircle
                        bgcolor="rgba(46, 76, 153, 0.5)"
                        bordercolor="rgba(66, 99, 235, 0.7)"
                    >
                        <Mail size={20} color="white"/>
                    </IconCircle>
                    <ContactContent>
                        <ContactTitle>{t("contactInfo.email.title")}</ContactTitle>
                        <ContactDetail>{t("contactInfo.email.value")}</ContactDetail>
                    </ContactContent>
                </ContactCardContainer>

                <ContactCardContainer>
                    <IconCircle
                        bgcolor="rgba(111, 66, 193, 0.5)"
                        bordercolor="rgba(147, 91, 247, 0.7)"
                    >
                        <Phone size={20} color="white"/>
                    </IconCircle>
                    <ContactContent>
                        <ContactTitle>{t("contactInfo.phone.title")}</ContactTitle>
                        <ContactDetail>{t("contactInfo.phone.value")}</ContactDetail>
                    </ContactContent>
                </ContactCardContainer>

                <ContactCardContainer>
                    <IconCircle
                        bgcolor="rgba(195, 66, 121, 0.5)"
                        bordercolor="rgba(245, 91, 156, 0.7)"
                    >
                        <MapPin size={20} color="white"/>
                    </IconCircle>
                    <ContactContent>
                        <ContactTitle>{t("contactInfo.address.title")}</ContactTitle>
                        <ContactDetail>{t("contactInfo.address.value")}</ContactDetail>
                    </ContactContent>
                </ContactCardContainer>
            </ContactCardsContainer>

            <SubmitButton type="submit">{t("submit")}</SubmitButton>
        </ServiceTypesColumn>
    );
}
