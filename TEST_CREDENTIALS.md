# Test Credentials - Mock Data

## 🧪 Credentials de Test

Utilisez ces identifiants pour tester l'application avec les données fictives :

### 👤 Compte Patient
- **Email:** `patient@example.com`
- **Password:** `password`
- **Accès:** Dashboard patient, Voir rendez-vous, Prendre rendez-vous

### 🏥 Compte Docteur  
- **Email:** `doctor@example.com`
- **Password:** `password`
- **Accès:** Vue calendrier, Gestion des rendez-vous, Schedule

### 👨‍💼 Compte Admin
- **Email:** `admin@example.com`
- **Password:** `password`
- **Accès:** Tableau de bord admin, Statistiques, Gestion système

---

## 📊 Données Fictives Chargées

### Patients
- **Jean Dupont** (patient@example.com) - 3 rendez-vous

### Docteurs (3 disponibles)
1. **Dr. Marie Laurent** - Cardiologue
2. **Dr. Pierre Moreau** - Dermatologue
3. **Dr. Sophie Richard** - Médecin Généraliste

### Rendez-vous Chargés
- 3 rendez-vous pour le patient test :
  - ✅ Consultation cardiaque (Confirmé)
  - ⏳ Consultation dermatologique (En attente)
  - ✅ Bilan de santé (Complété)

### Horaires Docteurs
- 4 plannings différents chargés en base

### Statistiques Admin
- **342** patients total
- **18** docteurs
- **1,205** rendez-vous (1087 complétés, 89 en attente, 29 annulés)

---

## ⚙️ Comment Fonctionne le Mock

### Fichiers Mock
- **`lib/mock-data.ts`** - Toutes les données fictives et fonctions de simulation
- **`lib/use-mock-api.ts`** - Hooks SWR pour accéder aux données

### Simulation de Latence
- Chaque appel mock a une latence simulée (300-800ms) comme un vrai API
- Permet de tester l'UX du chargement

### Stockage
- Les données sont en mémoire (réinitialisées au refresh)
- Le token et l'utilisateur sont stockés dans `localStorage`

---

## 🔄 Migration vers le Backend Réel

Quand votre backend est prêt :

### 1. Mettez à jour `auth-context.tsx`
```typescript
// Remplacez la fonction login
const login = async (email: string, password: string) => {
  const apiClient = (await import('@/lib/api-client')).default;
  const response = await apiClient.post('/auth/login', { email, password });
  // ... reste du code
}
```

### 2. Mettez à jour `use-mock-api.ts`
Remplacez les fetchers pour appeler votre vrai API :
```typescript
const appointmentsFetcher = async (key: string, userId: string) => {
  const apiClient = (await import('@/lib/api-client')).default;
  const response = await apiClient.get(`/appointments/user/${userId}`);
  return response.data;
}
```

### 3. Mettez à jour les API endpoints
Modifiez `lib/api-client.ts` avec votre URL backend réelle.

---

## 🧪 Tester les Fonctionnalités

### Vue Patient
1. Connectez-vous avec `patient@example.com`
2. Voyez le dashboard avec les 3 rendez-vous
3. Cliquez sur "Book Appointment" pour voir le formulaire
4. Allez dans "My Appointments" pour la liste complète

### Vue Docteur
1. Connectez-vous avec `doctor@example.com`
2. Accédez à la page "Schedule"
3. Voyez les horaires de consultation

### Vue Admin
1. Connectez-vous avec `admin@example.com`
2. Allez dans "Admin Dashboard"
3. Voyez les statistiques complètes du système

### Profil
- Accédez à "Profile" pour voir les infos utilisateur
- Les données s'affichent directement depuis le contexte auth

---

## 📝 Notes

- ⚠️ **Les données ne sont pas persistées** : Elles réinitialisent au refresh de la page
- ✅ **Le token est persisté** : Reste en localStorage même après refresh (jusqu'au logout)
- 🔄 **SWR cache les données** : Les appels suivants utilisent le cache local
- 📱 **Design responsive** : Fonctionne sur mobile/tablet/desktop

Bon testing! 🚀
