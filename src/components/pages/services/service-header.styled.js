import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { styled } from "styled-components";

export const HeaderContainer = styled.div`
  padding-top: 8vh;
  margin-bottom: 6vh;
  width: 100%;
  max-width: 1400px;
`;

export const MainTitle = styled.h1.attrs({
    className: 'fluid-type-5'
})`
  color: var(--color-text-light);
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

export const Divider = styled.div`
  width: 15rem;
  height: 0.25rem;
  background: linear-gradient(to right, #7928CA, #FF0080);
  margin-bottom: 2.5rem;
`;

export const SubtitleItalic = styled.h2.attrs({
    className: 'fluid-type-2'
})`
  font-style: italic;
  font-weight: 300;
  color: var(--color-text-light);
  margin-bottom: 0.5rem;
`;

export const SubtitleBold = styled.h2.attrs({
    className: 'fluid-type-3'
})`
  font-weight: 600;
  color: var(--color-text-light);
  margin-bottom: 2rem;
`;

export const Description = styled.p.attrs({
    className: 'fluid-type-0'
})`
  color: var(--color-text-light);
  max-width: 800px;
  line-height: 1.6;
`;
