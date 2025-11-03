# Installation de Docker (Linux / Windows)

Vous trouverez sur cette page les méthodes pour installer Docker et Docker Compose sur Linux et Windows, vérifications et étapes post‑installation adaptées à des projets Java / Spring Boot.

Cette page couvre les deux systèmes d'exploitation les plus courants. Pour macOS, référez-vous à la documentation officielle Docker.

---

## Vérifications préalables

- Vérifier Docker après installation :
  - `docker --version`
  - `docker compose version`
  - Test rapide : `docker run --rm hello-world`

---

## 1. Installation — Linux (ex. Debian / Ubuntu)

1. Mettre à jour et installer les dépendances :
   - `sudo apt update && sudo apt install -y ca-certificates curl gnupg lsb-release`

2. Ajouter le repository officiel Docker :
   - `sudo mkdir -p /etc/apt/keyrings`
   - `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /etc/apt/keyrings/docker.gpg`
   - `echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`

3. Installer Docker Engine et le plugin Compose :
   - `sudo apt update`
   - `sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin`

4. Activer et démarrer le service :
   - `sudo systemctl enable --now docker`

5. (Optionnel mais recommandé) Ajouter l'utilisateur au groupe `docker` pour utiliser Docker sans `sudo` :
   - `sudo usermod -aG docker $USER`
   - Se déconnecter / reconnecter ou exécuter `newgrp docker`

6. Vérifier :
   - `docker --version`
   - `docker compose version`
   - `docker run --rm hello-world`

Notes :

- Pour d'autres distributions Linux (RHEL, Arch, etc.), suivre la documentation officielle Docker.
- Sur autres distros (Fedora, CentOS), utiliser la documentation officielle Docker spécifique à la distribution.

---

## 2. Installation — Windows (Docker Desktop)

Prérequis :
- Windows 10 64‑bits: édition Pro, Enterprise ou Education (ou Windows 11).
- Activer la virtualisation; WSL2 recommandé pour de meilleures performances.

1. Installer WSL2 (recommandé) :
   - Ouvrir PowerShell en administrateur et exécuter :
     - `wsl --install` (Windows 10/11 récent) ou suivre la doc Microsoft si besoin.
   - Installer une distribution (ex. Ubuntu) depuis le Microsoft Store.

2. Télécharger et installer Docker Desktop :
   - Télécharger depuis : https://docs.docker.com/desktop/
   - Pendant l'installation, activer l'intégration WSL2 si proposée.

3. Configuration post‑installation :
   - Lancer Docker Desktop, vérifier que le moteur est démarré.
   - Dans les Settings, activer l'intégration avec la distribution WSL utilisée (ex. Ubuntu).
   - Ajuster mémoire/proc si nécessaire pour Spring Boot (Resources > Advanced).

4. Vérifier depuis PowerShell ou WSL :
   - `docker --version`
   - `docker compose version`
   - `docker run --rm hello-world`
   - Depuis WSL (recommandé pour dev) : `docker run --rm hello-world`

Notes :

- Docker Desktop inclut Docker Engine et Docker Compose (plugin).
- Si vous êtes sur Windows Home plus ancien, WSL2 est obligatoire. Pour environnements serveur sans Docker Desktop, utiliser la version Windows Server / MobyEngine (cas avancé).

---

## Ressources

- Documentation Docker : https://docs.docker.com
- Guide d'installation Docker Desktop : https://docs.docker.com/desktop/
- Guide WSL2 : https://learn.microsoft.com/windows/wsl

---