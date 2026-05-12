# Make my visu — Portfolio

Site portfolio professionnel de **Make my visu** (Manon Almu), créatrice de visuels marketing
et contenus Instagram. Construit avec Next.js 15, TypeScript, Tailwind CSS v4 et Framer Motion.

→ Production : [makemyvisu.fr](https://makemyvisu.fr)

---

## Stack

- **Framework** : Next.js 15 (App Router) + React 19
- **Langage** : TypeScript strict
- **Styling** : Tailwind CSS v4 (config CSS-first dans `globals.css`)
- **Animations** : Framer Motion
- **Polices** : Anton + Inter + Cormorant Garamond via `next/font`
- **Prise de RDV** : Calendly (embed inline)
- **CMS** : TinaCMS (admin sur `/admin`, contenu dans `content/`)
- **Déploiement** : Vercel

## Démarrage

```bash
# Cloner et installer
git clone <repo>
cd ManonCM
npm install

# Configurer les variables d'env
cp .env.local.example .env.local

# Lancer en dev
npm run dev
# → http://localhost:3000
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance le build de production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run typecheck` | Vérifie les types TypeScript |

## Structure

```
src/
├── app/                    # App Router (pages, sitemap, robots, OG)
│   ├── portfolio/
│   ├── tarifs/
│   ├── contact/            # Embed Calendly + bilan offert
│   └── mentions-legales/
├── components/
│   ├── layout/             # Nav, Footer
│   ├── motion/             # FadeInWhenVisible, Tilt3D, Hero3DScene
│   ├── sections/           # Hero, About, Services, Pricing…
│   └── ui/                 # Button, ServiceCard, CalendlyEmbed…
└── data/                   # Contenu éditorial (projets, services, tarifs…)
```

## Mettre à jour le contenu

Tout le contenu est dans `src/data/*.ts`. Pas de CMS pour la v1.

### Ajouter un projet au portfolio

1. Ajoute une image dans `public/projects/<slug>.svg` (ou `.jpg`/`.webp`).
2. Ajoute une entrée dans `src/data/projects.ts` :

```ts
{
  slug: "nouveau-projet",
  title: "Titre du projet",
  client: "Nom du client",
  category: "event", // "event" | "fitness" | "food" | "coaching"
  categoryLabel: "Événementiel",
  year: "2026",
  description: "Description courte du projet (1–2 phrases).",
  cover: "/projects/nouveau-projet.svg",
  size: "wide", // "wide" | "tall" | "square" — pilote la grille
}
```

Les 6 premiers projets de la liste apparaissent sur la homepage, tous sur `/portfolio`.

### Modifier les tarifs

Édite `src/data/pricing.ts` :

- `packs` : les 3 cards en haut de la page tarifs.
- `unitItems` : les prestations à l'unité listées plus bas.

### Modifier les services / la méthode / la FAQ / les témoignages

- `src/data/services.ts`
- `src/data/method.ts`
- `src/data/faq.ts`
- `src/data/testimonials.ts`

## Configurer TinaCMS (admin de contenu pour Manon)

L'admin TinaCMS permet à Manon d'éditer ses projets portfolio (titres, images, descriptions) directement depuis son navigateur sans toucher au code.

### Setup initial (une fois)

1. Crée un compte gratuit sur [app.tina.io](https://app.tina.io) (option "Sign up with GitHub")
2. **"Create Project"** :
   - Connecte le repo GitHub `Sacha30650/ManonCM`
   - Branche : `main`
   - Path to config : `tina`
3. Récupère deux valeurs dans **Project Settings** :
   - `Client ID` (visible en haut)
   - `Token` → **Tokens** tab → **Generate** un nouveau read+write token
4. Ajoute-les dans **Vercel → Settings → Environment Variables** :
   - `NEXT_PUBLIC_TINA_CLIENT_ID` = valeur du Client ID
   - `TINA_TOKEN` = valeur du Token
5. **Redeploy** sur Vercel pour activer l'admin

### Utiliser l'admin

- Va sur `makemyvisu.fr/admin/index.html`
- Connecte-toi avec ton compte Tina
- Édite tes projets, sauvegarde → ça commit auto sur GitHub → Vercel redéploie sous ~1 min

### Local dev (édition de contenu en local)

```bash
npm run tina:dev   # Lance Tina + Next.js ensemble
# → Admin sur http://localhost:3000/admin/index.html
```

## Configurer Calendly (prise de rendez-vous)

Le bouton "Bilan offert" pointe vers un événement Calendly intégré en inline embed.

1. Crée un événement Calendly de 30 min nommé "Bilan stratégique offert".
2. Récupère son URL (format `https://calendly.com/<utilisateur>/<event>`).
3. Mets à jour la constante `CALENDLY_URL` dans `src/components/sections/ContactCTA.tsx`.

## Déploiement Vercel

1. Push sur GitHub.
2. Importe le repo dans [Vercel](https://vercel.com/new).
3. Ajoute la variable d'env `NEXT_PUBLIC_SITE_URL` = `https://makemyvisu.fr`.
4. Déploie. Vercel détecte automatiquement Next.js 15.
5. Connecte le domaine `makemyvisu.fr` dans Settings → Domains.

## Design system

Couleurs et tokens définis dans `src/app/globals.css` (Tailwind v4 `@theme`) :

- `background` `#0a0a0a` · `surface` `#141414` · `border` `#2a2a2a`
- `accent` `#ff6b9d` · `accent-soft` `#f5b8c8`
- Display : Anton · Body : Inter

Pour modifier, édite directement les variables dans `globals.css`.

## SEO

- Metadata par page (Next 15 conventions)
- `sitemap.xml` et `robots.txt` auto-générés (`src/app/sitemap.ts`, `src/app/robots.ts`)
- Schema.org `ProfessionalService` injecté dans le layout
- Open Graph dynamique généré via `src/app/opengraph-image.tsx`
- Lang `fr` + `metadataBase` configuré

## Performance & accessibilité

- `next/font` avec `display: swap`
- Images `next/image` quand applicable
- `prefers-reduced-motion` respecté (animations désactivées)
- Focus visible custom sur tous les éléments interactifs
- Contraste WCAG AA vérifié sur la palette

## Licence

© Make my visu — Tous droits réservés.
