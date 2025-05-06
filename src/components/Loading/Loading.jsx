"use client"
import React from 'react';
import {OptimizedImage} from "@/components/optimizedImage";


export default function Loading() {
    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            background: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            zIndex: '20000',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative',
                zIndex: '20001',
            }}>
                <svg
                    style={{
                        width: '30vh',
                        height: '30vh',
                    }}
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="transparent"
                        strokeWidth="1"
                    />
                    <path
                        fill="none"
                        stroke="#96b9fa"
                        strokeWidth="1"
                        strokeLinecap="round"
                        d="M 50,50 m 0,-45 a 45,45 0 1,1 0,90 a 45,45 0 1,1 0,-90"
                        pathLength="100"
                        strokeDasharray="20 80"
                        strokeDashoffset="0"
                    >
                        <animate
                            attributeName="stroke-dasharray"
                            values="15 85; 20 80; 25 75; 30 70; 35 65; 40 60; 45 55; 50 50; 45 55; 40 60; 35 65; 30 70; 25 75; 20 80; 15 85"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 50 50"
                            to="360 50 50"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="stroke-width"
                            values="1;2;3;3;2;1"
                            dur="5s"
                            repeatCount="indefinite"
                        />
                    </path>
                </svg>
                <OptimizedImage
                    style={{
                        width: '20vh',
                        height: 'auto',
                        mixBlendMode: "plus-lighter",
                        position: 'absolute',
                    }}
                    width={1754}
                    height={815}
                    alt={'Brand Logo'}
                    src={'/images/brand/brand_large.png'}
                    priority={true}
                />
            </div>
        </div>
    );
}
