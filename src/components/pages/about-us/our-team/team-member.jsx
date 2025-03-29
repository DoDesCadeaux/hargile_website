// src/components/pages/about-us/our-team/team-member.jsx
import React from "react";
import {MemberCard, MemberImage, MemberInfo, MemberName, MemberRole} from "./team-member.styled";
import {OptimizedImage} from "@/components/optimizedImage";

const TeamMember = ({name, role, imageSrc}) => {
    return (
        <MemberCard>
            <MemberImage>
                <OptimizedImage
                    style={{maxWidth: '100%'}}
                    src={imageSrc}
                    alt={name}
                    width={240}
                    height={240}
                />
            </MemberImage>
            <MemberInfo>
                <MemberName>{name}</MemberName>
                <MemberRole>{role}</MemberRole>
            </MemberInfo>
        </MemberCard>
    );
};

export default TeamMember;
