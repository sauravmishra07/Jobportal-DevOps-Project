#!/bin/bash
set -e

# -----------------------------
# 1. Update & install core packages
# -----------------------------
sudo apt update -y
sudo apt install -y fontconfig wget curl gnupg lsb-release apt-transport-https snapd

# -----------------------------
# 2. Install OpenJDK 21
# -----------------------------
sudo apt install -y openjdk-21-jre
java -version

# -----------------------------
# 3. Jenkins installation (2026 key)
# -----------------------------
sudo mkdir -p /etc/apt/keyrings
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key

echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update -y
sudo apt install -y jenkins

sudo systemctl start jenkins
sudo systemctl enable jenkins

# -----------------------------
# 4. Docker installation
# -----------------------------
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

sudo usermod -aG docker $USER
sudo usermod -aG docker jenkins || echo "Jenkins user added"

# -----------------------------
# 5. Trivy installation (official doc method)
# -----------------------------
sudo apt-get install -y wget gnupg
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee /etc/apt/sources.list.d/trivy.list

sudo apt-get update -y
sudo apt-get install -y trivy

# -----------------------------
# 6. AWS CLI, Helm, kubectl
# -----------------------------
sudo snap install aws-cli --classic
sudo snap install helm --classic
sudo snap install kubectl --classic

# -----------------------------
# 7. Finish
# -----------------------------
echo "Installation complete!"
echo "Jenkins: sudo systemctl status jenkins"
echo "Docker: docker ps (log out/in may be required for group changes)"
echo "Trivy: trivy --version"
echo "AWS CLI, Helm, kubectl installed"
echo "Initial Jenkins admin password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword