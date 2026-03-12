# Deployment guide

This guide explain how to run data-platform with a Linux server and Docker Compose. We use Ansible to automate this process if Docker is already installed on your system you can use only the docker-compose.yml file and the .env to setup the system.

## Installation

We use `VirtualEnv` to create an isolated environment separate from other projects. You can install it with `pip`:
```bash
pip install virtualenv
```

Create a new environment with `VirtualEnv`:
```bash
virtualenv .venv
```

Activate the Python environment:
```bash
source .venv/bin/activate
```

Install the required packages for Ansible:
```bash
pip install -r ansible/requirements.txt
```

Install the required collections for Ansible:
```bash
ansible-galaxy collection install -r ansible/requirements.yml
```

## Playbooks

Ce dépot comprend plusieurs playbooks pour gérer la vie d'un VPS. Commande pour exécuter un playbook :
```bash
ansible-playbook ansible/setup.yml --ask-vault-pass
```

**Options :**
- `--ask-vault-pass` : Donne le mot de passe pour décrypter les fichiers Ansible Vault

### setup.yml

Permet d'installer le frontend de data-platform et n8n avec docker compose et traeffic.

## Gestion des secrets

Ce projet utilise [Ansible Vault](https://docs.ansible.com/projects/ansible/latest/vault_guide/index.html) pour chiffrer les données sensibles (mots de passe, clés SSH). Le mot de passe maître doit être renseigner à chaque exécution d'un playbook Ansible. On peut le trouver dans le Keypass. Voici comment fonctionnent les fichiers et comment les utiliser :

**Utilisation :**
- Chiffrer un fichier : `ansible-vault encrypt ansible/vars/secrets.yml`
- Editer un fichier chiffré : `ansible-vault edit ansible/vars/secrets.yml`
- Déchiffrer un fichier : `ansible-vault decrypt ansible/vars/secrets.yml`

Les données sensibles ne doivent jamais être commis en clair dans le dépôt git.

## n8n setup

After first installation, you need to create a administrator account.

After, you need to import the workflow.

Create supabase credential

Change the url inside the csv download node (see how we can improve this part)
