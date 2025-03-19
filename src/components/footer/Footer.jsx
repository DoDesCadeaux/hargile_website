"use client"

import React from 'react';
import styled from 'styled-components';
import {Link} from "@/i18n/navigation";
import {FooterLink} from "@/components/footer/footer-link";
import {Column} from "@/components/footer/column";
import {Heading} from "@/components/footer/heading";
import {FooterContainer} from "@/components/footer/footer-container";
import {FooterContent} from "@/components/footer/footer-content";
import {NewsletterSection} from "@/components/footer/newsletter-section";
import {EmailInput} from "@/components/footer/email-input";
import {BottomBar} from "@/components/footer/bottom-bar";
import {BottomLinks} from "@/components/footer/bottom-links";

const Text = styled.p`
    margin-bottom: 0.5rem;
`;

const Copyright = styled.div`
    color: rgba(255, 255, 255, 0.7);
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                {/* Company info */}
                <Column>
                    <Heading>Hargile</Heading>
                    <Text>123 Lorem ipsum</Text>
                    <FooterLink href="mailto:info@hargile.com">info@hargile.com</FooterLink>
                    <Text>Numéro de téléphone</Text>
                </Column>

                {/* Solutions */}
                <Column>
                    <Heading>Solutions</Heading>
                    <FooterLink as={Link} href="/solutions/agves">AGVES</FooterLink>
                    <FooterLink as={Link} href="/solutions/i-go">I GO</FooterLink>
                    <FooterLink as={Link} href="/solutions/multipass">MultiPass</FooterLink>
                </Column>

                {/* Services */}
                <Column>
                    <Heading>Services</Heading>
                    <FooterLink as={Link} href="/services/web-development">Web Development</FooterLink>
                    <FooterLink as={Link} href="/services/mobile-applications">Mobile applications</FooterLink>
                    <FooterLink as={Link} href="/services/ai-solutions">AI Solutions</FooterLink>
                    <FooterLink as={Link} href="/services/digital-marketing">Digital Marketing</FooterLink>
                    <FooterLink as={Link} href="/services/cloud">Cloud</FooterLink>
                </Column>

                {/* Company */}
                <Column>
                    <Heading>Company</Heading>
                    <FooterLink as={Link} href="/about">About Us</FooterLink>
                    <FooterLink as={Link} href="/team">Our Team</FooterLink>
                    <FooterLink as={Link} href="/contact">Contact</FooterLink>
                </Column>

                {/* Resources */}
                <Column>
                    <Heading>Resources</Heading>
                    <FooterLink as={Link} href="/blog">Blog</FooterLink>
                    <FooterLink as={Link} href="/case-studies">Case studies</FooterLink>
                </Column>
            </FooterContent>

            {/* Newsletter */}
            <NewsletterSection>
                <Heading>Stay updated</Heading>
                <Text>Subscribe to our newsletter</Text>
                <EmailInput type="email" placeholder="Your email address"/>
            </NewsletterSection>

            {/* Bottom bar */}
            <BottomBar>
                <Copyright>© 2025 Hargile. All Rights Reserved</Copyright>
                <BottomLinks>
                    <FooterLink as={Link} href="/legal/privacy">Privacy Policy</FooterLink>
                    <FooterLink as={Link} href="/legal/terms">Terms of Services</FooterLink>
                    <FooterLink as={Link} href="/legal/cookies">Cookie Policy</FooterLink>
                    <FooterLink as={Link} href="/accessibility">Accessibility</FooterLink>
                    <FooterLink as={Link} href="/sitemap">Site Map</FooterLink>
                </BottomLinks>
            </BottomBar>
        </FooterContainer>
    );
};

export default Footer;
