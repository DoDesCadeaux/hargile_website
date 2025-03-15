"use client";

import Earth from '@/components/Earth';
import {Navbar} from "@/components/navigation/navbar";

export default function HomePage() {
    return (
        <>
            <Navbar/>
            <Earth>
                <div className={"container"}>
                    {/* Section d'accueil - Texte à droite */}
                    <div className="min-h-screen flex flex-col justify-center">
                        <div className="container mx-auto px-4">
                            <div className="flex justify-end">
                                <div className="w-full md:w-1/2 lg:w-2/5 p-8  rounded-lg">
                                    <h1 className="text-5xl font-bold mb-6 text-white">Bienvenue sur mon site</h1>
                                    <p className="text-xl mb-8 text-gray-200">
                                        Explorez mes projets et découvrez mon approche créative
                                    </p>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                                        En savoir plus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section À propos - Texte à gauche */}
                    <div className="min-h-screen flex flex-col justify-center">
                        <div className="container mx-auto px-4">
                            <div className="flex justify-start">
                                <div className="w-full md:w-1/2 lg:w-2/5 p-8 rounded-lg">
                                    <h2 className="text-4xl font-bold mb-6 text-white">À propos de moi</h2>
                                    <p className="text-xl mb-6 text-gray-200">
                                        Je suis un développeur passionné par les technologies web modernes et la
                                        création
                                        d'expériences utilisateur immersives.
                                    </p>
                                    <p className="text-xl mb-6 text-gray-200">
                                        Spécialisé dans React, Three.js et Next.js, je crée des sites web qui combinent
                                        esthétique et performance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Projets - Texte à droite */}
                    <div className="min-h-screen flex flex-col justify-center">
                        <div className="container mx-auto px-4">
                            <div className="flex justify-end">
                                <div className="w-full md:w-1/2 lg:w-2/5 p-8 rounded-lg">
                                    <h2 className="text-4xl font-bold mb-6 text-white">Mes projets</h2>
                                    <div className="space-y-6">
                                        <div className="bg-white/10 p-6 rounded-lg">
                                            <h3 className="text-2xl font-bold mb-3 text-white">Projet 1</h3>
                                            <p className="text-gray-200">Une application web interactive utilisant
                                                Three.js
                                                et WebGL.</p>
                                        </div>
                                        <div className="bg-white/10 p-6 rounded-lg">
                                            <h3 className="text-2xl font-bold mb-3 text-white">Projet 2</h3>
                                            <p className="text-gray-200">Un dashboard de visualisation de données en
                                                temps
                                                réel.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Contact - Texte à gauche */}
                    <div className="min-h-screen flex flex-col justify-center">
                        <div className="container mx-auto px-4">
                            <div className="flex justify-start">
                                <div className="w-full md:w-1/2 lg:w-2/5 p-8 bg-black/30 rounded-lg">
                                    <h2 className="text-4xl font-bold mb-6 text-white">Contactez-moi</h2>
                                    <p className="text-xl mb-8 text-gray-200">
                                        Vous avez un projet intéressant? N'hésitez pas à me contacter!
                                    </p>
                                    <form>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder="Votre nom"
                                                className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="email"
                                                placeholder="Votre email"
                                                className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div className="mb-6">
                  <textarea
                      placeholder="Votre message"
                      rows="4"
                      className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                  ></textarea>
                                        </div>
                                        <button type="submit"
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                                            Envoyer
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Earth>
        </>
    );
}
