
# Plan: Images Cliquables + Gestion du Favicon dans l'Admin

## Objectif
Ajouter deux fonctionnalités demandées par le client:
1. Rendre toutes les images du site cliquables pour les afficher en grand (lightbox)
2. Permettre de changer le favicon depuis le panneau d'administration

---

## Partie 1: Images Cliquables sur tout le Site

### 1.1 Creer un Composant Lightbox Reutilisable
Creer un nouveau composant `ImageLightbox` qui peut etre utilise partout sur le site pour afficher une image en plein ecran lorsqu'on clique dessus.

**Fichier:** `src/components/ui/ImageLightbox.tsx`
- Modal plein ecran avec fond sombre
- Bouton de fermeture (X)
- Fermeture avec la touche Escape
- Fermeture en cliquant sur le fond
- Animation d'ouverture/fermeture fluide

### 1.2 Creer un Hook de Gestion du Lightbox
Un hook personnalise pour gerer l'etat du lightbox de maniere centralisee.

**Fichier:** `src/hooks/useImageLightbox.tsx`
- Provider React Context pour partager l'etat
- Fonctions: `openImage(src, alt)` et `closeImage()`

### 1.3 Integrer le Lightbox dans les Composants Existants

| Composant | Fichier | Images concernees |
|-----------|---------|-------------------|
| ServiceFeatureCard | `src/components/services/ServiceFeatureCard.tsx` | 4 images (1 grande + 3 petites) |
| GartenProjectCard | `src/components/garten/GartenProjectCard.tsx` | 4 images (1 grande + 3 petites) |
| Services | `src/components/Services.tsx` | Image principale de chaque service |
| About | `src/components/About.tsx` | Image de la section (si presente) |

### 1.4 Style des Images Cliquables
- Curseur `pointer` au survol
- Effet de zoom leger au survol
- Icone "agrandir" discrete en overlay

---

## Partie 2: Gestion du Favicon dans l'Admin

### 2.1 Ajouter une Entree dans la Base de Donnees
Utiliser la table existante `site_content` pour stocker l'URL du favicon.

```sql
INSERT INTO site_content (section, key, value)
VALUES ('branding', 'favicon_url', '/favicon.png');
```

### 2.2 Creer une Section "Branding" dans l'Admin
Ajouter une nouvelle section dans l'onglet "Einstellungen" pour gerer le favicon.

**Fichier:** `src/components/admin/AdminGartenSettingsTab.tsx` (renommer ou etendre)
- Upload d'image pour le favicon
- Apercu du favicon actuel
- Bouton de sauvegarde

### 2.3 Appliquer le Favicon Dynamiquement
Creer un hook qui charge le favicon depuis la base de donnees et l'applique dynamiquement au document.

**Fichier:** `src/hooks/useFavicon.ts`
- Charger l'URL du favicon depuis `site_content`
- Mettre a jour le `<link rel="icon">` dans le DOM

### 2.4 Integrer dans App.tsx
Appeler le hook `useFavicon` dans le composant principal pour appliquer le favicon au chargement.

---

## Resume des Fichiers

### Nouveaux Fichiers
1. `src/components/ui/ImageLightbox.tsx` - Composant lightbox reutilisable
2. `src/hooks/useImageLightbox.tsx` - Hook et Context Provider
3. `src/hooks/useFavicon.ts` - Hook pour le favicon dynamique

### Fichiers Modifies
1. `src/App.tsx` - Ajouter le Provider et le hook favicon
2. `src/components/services/ServiceFeatureCard.tsx` - Images cliquables
3. `src/components/garten/GartenProjectCard.tsx` - Images cliquables
4. `src/components/Services.tsx` - Images cliquables
5. `src/components/admin/AdminGartenSettingsTab.tsx` - Section favicon

### Migration Base de Donnees
- Ajouter une entree `favicon_url` dans `site_content`

---

## Avantages de cette Approche

- **Reutilisabilite**: Le lightbox peut etre utilise sur n'importe quelle image du site
- **Performance**: Chargement paresseux des images en plein ecran
- **UX**: Navigation fluide et intuitive
- **Admin Simple**: Interface claire pour changer le favicon
- **Pas de Casse**: Toutes les fonctionnalites existantes restent intactes

