"use client"


import {useTranslations} from "next-intl";
import {Navbar} from "@/components/navbar";

export default function Home({}) {
    const t = useTranslations();

    return (
        <div>
            <Navbar></Navbar>

            <header>
                <h1>Traduction: {t('test')}</h1>
                <h1>Test de typographie fluide</h1>
                <nav>
                    <button>Thème sombre</button>
                </nav>
            </header>

            <main>
                <article>
                    <h2>Article démonstratif</h2>

                    <section>
                        <h1>Sous-titre h1</h1>
                        <h2>Sous-titre h2</h2>
                        <h3>Sous-titre h3</h3>
                        <h4>Sous-titre h4</h4>
                        <h5>Sous-titre h5</h5>
                        <h6>Sous-titre h6</h6>
                    </section>

                    <section>
                        <h3>Éléments textuels</h3>
                        <p>Paragraphe standard avec <strong>texte important</strong> et <em>texte emphatisé</em>.
                        </p>
                        <blockquote>
                            Citation avec texte mis en avant
                            <cite>- Auteur</cite>
                        </blockquote>
                    </section>

                    <section>
                        <h3>Listes</h3>
                        <ul>
                            <li>Élément de liste 1</li>
                            <li>Élément de liste 2</li>
                        </ul>
                        <ol>
                            <li>Élément ordonné 1</li>
                            <li>Élément ordonné 2</li>
                        </ol>
                        <dl>
                            <dt>Terme</dt>
                            <dd>Définition</dd>
                        </dl>
                    </section>

                    <section>
                        <h3>Formulaires</h3>
                        <form>
                            <label htmlFor="name">Nom :</label>
                            <input type="text" id="name"/>

                            <label htmlFor="email">Email :</label>
                            <input type="email" id="email"/>

                            <button type="submit">Envoyer</button>
                        </form>
                    </section>

                    <section>
                        <h3>Tableau</h3>
                        <table>
                            <caption>Données démonstratives</caption>
                            <thead>
                            <tr>
                                <th>En-tête 1</th>
                                <th>En-tête 2</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Donnée 1</td>
                                <td>Donnée 2</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    <section>
                        <h3>Éléments divers</h3>
                        <figure>
                            <img src="" alt="Image exemple"/>
                            <figcaption>Légende d'image</figcaption>
                        </figure>
                        <address>Adresse de contact</address>
                        <time dateTime="2023-01-01">1er Janvier 2023</time>
                        <p>Texte avec <abbr
                            title="Abbréviation">abbr.</abbr>, <mark>surlignage</mark>, <sup>exposant</sup> et <sub>indice</sub>.
                        </p>
                    </section>
                </article>
            </main>

            <footer>
                <small>© 2023 Test Typographie</small>
            </footer>

        </div>
    );
}
