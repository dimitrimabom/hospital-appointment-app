# 🏥 Guide Complet pour Tester avec Données Fictives

Bienvenue! L'application est maintenant **fully fonctionnelle avec des données fictives (mock data)** pour vous permettre de tester complètement sans backend.

---

## ✅ Étapes Rapides

### 1️⃣ **Ouvrir l'Application**
- L'app est en cours d'exécution sur: **http://localhost:3000**
- Le preview devrait se charger automatiquement

### 2️⃣ **Se Connecter avec des Données Fictives**

Utilisez l'un de ces 3 comptes:

| Rôle | Email | Mot de passe | Accès |
|------|-------|--------|--------|
| **Patient** 👤 | `patient@example.com` | `password` | Voir/Créer rendez-vous |
| **Docteur** 🏥 | `doctor@example.com` | `password` | Voir planning |
| **Admin** 👨‍💼 | `admin@example.com` | `password` | Tableau de bord stats |

### 3️⃣ **Explorer les Fonctionnalités**

#### 👤 Compte Patient
1. Connectez-vous avec `patient@example.com`
2. Voyez le **Dashboard** avec 3 rendez-vous pré-chargés
3. Allez dans **My Appointments** pour voir la liste complète
4. Cliquez sur **Book Appointment** pour créer un nouveau rendez-vous
5. Visitez **Profile** pour voir les infos utilisateur
6. Consultez **Help** pour les questions fréquentes

#### 🏥 Compte Docteur
1. Connectez-vous avec `doctor@example.com`
2. Accédez à **Schedule** pour voir les horaires de consultation
3. Visualisez les plannings de consultation disponibles

#### 👨‍💼 Compte Admin
1. Connectez-vous avec `admin@example.com`
2. Allez dans **Admin Dashboard**
3. Voyez les statistiques du système:
   - 342 patients
   - 18 docteurs
   - 1,205 rendez-vous
   - Graphiques par spécialité

---

## 📊 Données Fictives Chargées

### Rendez-vous du Patient Test
```
1. Consultation Cardiaque
   - Médecin: Dr. Marie Laurent (Cardiologue)
   - Date: 15 mai 2026 à 10:30
   - Statut: ✅ Confirmé
   - Location: Clinique Saint-Louis, Paris

2. Consultation Dermatologique
   - Médecin: Dr. Pierre Moreau (Dermatologue)
   - Date: 20 mai 2026 à 14:00
   - Statut: ⏳ En attente
   - Location: Cabinet Médical Centre, Paris

3. Bilan de Santé Annuel
   - Médecin: Dr. Sophie Richard (Généraliste)
   - Date: 10 mai 2026 à 09:00
   - Statut: ✅ Complété
   - Location: Cabinet Médical Montmartre, Paris
```

### Médecins Disponibles (3)
- **Dr. Marie Laurent** - Cardiologue (4.8★)
- **Dr. Pierre Moreau** - Dermatologue (4.6★)
- **Dr. Sophie Richard** - Médecin Généraliste (4.9★)

### Horaires de Consultation
- Dr. Marie Laurent: Lun/Mar/Mer/Ven (8h-18h)
- Dr. Pierre Moreau: Lun/Mer/Jeu/Sam (10h-17h)
- Dr. Sophie Richard: Lun/Mar/Mer/Jeu/Ven (8h-19h)

---

## 🧪 Tests Recommandés

### Test 1: Connexion & Redirection
- ✅ Connectez-vous avec patient@example.com
- ✅ Vérifiez que vous êtes redirigé vers /dashboard
- ✅ Cliquez sur "Logout" dans la navbar
- ✅ Vérifiez que vous êtes redirigé vers /login

### Test 2: Voir les Rendez-vous
- ✅ Connectez-vous en tant que patient
- ✅ Le Dashboard affiche 3 rendez-vous
- ✅ Allez dans "My Appointments"
- ✅ Voyez la liste complète avec détails
- ✅ Les statuts s'affichent correctement (Confirmé, En attente, Complété)

### Test 3: Réserver un Rendez-vous
- ✅ Dans "My Appointments", remplissez le formulaire:
  - Sélectionnez un docteur
  - Choisissez une date
  - Choisissez une heure
  - Entrez la raison de la visite
  - Ajoutez des notes (optionnel)
- ✅ Cliquez "Book Appointment"
- ✅ Vous voyez un message de succès (toast)
- ✅ Le rendez-vous s'ajoute à la liste

### Test 4: Vue Docteur
- ✅ Connectez-vous avec doctor@example.com
- ✅ Allez dans "Schedule"
- ✅ Voyez les horaires de consultation
- ✅ Informations sur les créneaux disponibles

### Test 5: Vue Admin
- ✅ Connectez-vous avec admin@example.com
- ✅ Cliquez sur "Admin Dashboard"
- ✅ Voyez les statistiques du système
- ✅ Graphiques par spécialité
- ✅ Top docteurs

### Test 6: Profil Utilisateur
- ✅ Connectez-vous avec n'importe quel compte
- ✅ Allez dans "Profile"
- ✅ Voyez vos informations personnelles
- ✅ Les données correspondent au compte connecté

### Test 7: Responsive Design
- ✅ Testez sur mobile (ouvrez DevTools, toggle device toolbar)
- ✅ Vérifiez que le design s'adapte
- ✅ Vérifiez que la navigation fonctionne
- ✅ Les formulaires sont utilisables

### Test 8: Erreurs & Validations
- ✅ Essayez des identifiants incorrects (erreur attendue)
- ✅ Essayez de réserver sans remplir tous les champs (erreur attendue)
- ✅ Vérifiez les messages d'erreur/succès (toasts)

---

## 🔧 Fonctionnement des Mock Data

### Comment Ça Marche
1. **Fichier principal:** `lib/mock-data.ts`
   - Toutes les données fictives
   - Fonctions de simulation d'API
   - Latence simulée (300-800ms) comme un vrai API

2. **Hooks personnalisés:** `lib/use-mock-api.ts`
   - `useAppointments()` - Récupère les rendez-vous
   - `useDoctors()` - Récupère la liste des docteurs
   - `useSchedules()` - Récupère les horaires
   - `useAdminStats()` - Récupère les stats admin

3. **Auth Context:** `lib/auth-context.tsx`
   - Utilise `mockLogin()` au lieu du vrai API
   - Stocke le token en localStorage
   - Gère les redirections automatiques

### Simulation de Latence
Chaque appel mock simulate une latence réseau:
```
mockLogin() → 500ms
mockGetAppointments() → 600ms
mockGetDoctors() → 400ms
mockGetSchedules() → 400ms
mockGetAdminStats() → 800ms
```

Cela vous permet de **tester le UX du chargement** (spinners, skeletons).

### Données en Mémoire
- ⚠️ **Les données ne sont PAS persistées**
- 🔄 Au refresh de la page, elles réinitialisent
- 💾 Mais le **token reste en localStorage** jusqu'au logout

---

## 🚀 Prochaines Étapes: Migration vers le Backend Réel

Quand votre backend est prêt, suivez ces étapes:

### Étape 1: Mettre à Jour `lib/auth-context.tsx`
```typescript
// Avant (mock):
const login = async (email: string, password: string) => {
  const { mockLogin } = await import('@/lib/mock-data');
  const { user: userData, token: newToken } = await mockLogin(email, password);
};

// Après (réel):
const login = async (email: string, password: string) => {
  const apiClient = (await import('@/lib/api-client')).default;
  const response = await apiClient.post('/auth/login', { email, password });
  const { user: userData, token: newToken } = response.data;
};
```

### Étape 2: Mettre à Jour `lib/use-mock-api.ts`
Remplacez les fetchers pour appeler votre vrai API:
```typescript
const fetchAppointments = async (userId: string) => {
  const apiClient = (await import('@/lib/api-client')).default;
  const response = await apiClient.get(`/appointments/user/${userId}`);
  return response.data;
};
```

### Étape 3: Configurer l'URL Backend
Dans `lib/api-client.ts`:
```typescript
const API_BASE_URL = 'https://votre-api-backend.com';
// Au lieu de:
const API_BASE_URL = 'http://localhost:3001';
```

### Étape 4: Tester Complètement
- ✅ Testez toutes les pages
- ✅ Testez les formulaires
- ✅ Testez les erreurs
- ✅ Testez les redirections

---

## 📝 Notes Importantes

### ✅ Ce Qui Fonctionne
- ✅ Tous les formulaires
- ✅ Toutes les pages
- ✅ Navigation complète
- ✅ Authentification
- ✅ Role-based access control
- ✅ Responsive design
- ✅ Messages de succès/erreur

### ⚠️ Limitations des Mock Data
- ⚠️ Données non-persistées
- ⚠️ Pas de modifications persistantes
- ⚠️ Pas de calculs complexes côté serveur
- ⚠️ Pas de vrai système de files d'attente

### 🔒 Sécurité
- ✅ Contexte d'authentification
- ✅ Protected routes
- ✅ Role-based redirects
- ✅ Token management
- ✅ localStorage avec tokens

---

## 📞 Support

Si vous rencontrez des problèmes:
1. **Rechargez la page** (F5)
2. **Videz le cache** (Ctrl+Shift+Delete)
3. **Vérifiez la console** (F12 → Console)
4. **Redémarrez le serveur** (Ctrl+C, puis `pnpm dev`)

---

## 🎯 Checklist Final

Avant de passer en production:

- [ ] Tous les endpoints API sont implémentés
- [ ] Tous les tests de mock data passent
- [ ] La base de données est prête
- [ ] L'authentification réelle fonctionne
- [ ] Les validations côté serveur sont en place
- [ ] Les erreurs sont gérées correctement
- [ ] Les permissions sont vérifiées
- [ ] Le design responsive fonctionne partout

---

## 🎉 Bon Testing!

Vous êtes maintenant prêt à tester complètement l'application! Amusez-vous bien 🚀
