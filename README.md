# 👨‍💼 JobPortal - Modern Job Portal Platform

[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.4.9-green?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.10-black?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.5-blue?style=flat-square&logo=tailwind)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

JobPortal is a modern, full-stack job portal platform built with React, Vite, Node.js, and MongoDB. It features a beautiful UI with Tailwind CSS & shadcn/ui, secure JWT authentication, job applications, company management, and complete DevOps CI/CD deployment.

## ✨ Features

- 🎨 Modern responsive UI with shadcn/ui components
- 🔐 Secure JWT-based authentication system
- 💼 Complete job listings with advanced filtering
- 🏢 Company profiles and job posting capabilities
- 👨‍💼 User profiles, applications, and tracking
- 📊 Admin dashboard for jobs/companies/applications
- ☁️ Cloudinary integration for resume uploads
- 📱 Mobile-first responsive design
- ⚡ Redux Toolkit state management
- 🚀 Full CI/CD with Jenkins + Kubernetes

## 🏗️ Architecture

JobPortal follows a three-tier architecture pattern:

### 1. Presentation Tier (Frontend)
- React + Vite + TailwindCSS + shadcn/ui
- Redux Toolkit for State Management
- Responsive Components & UI Library
- Client-side Routing with React Router

### 2. Application Tier (Backend)
- Node.js + Express REST API
- JWT Authentication & Middleware
- Business Logic & Validation
- Cloudinary File Uploads
- MongoDB Integration

### 3. Data Tier (Database)
- MongoDB (Atlas + Kubernetes StatefulSet)
- Mongoose ODM Schemas
- User/Job/Company/Application Models
- Seed Data & Migrations

## PreRequisites

> [!IMPORTANT]  
> Before you begin setting up this project, make sure the following tools are installed and configured properly on your system:

## Setup & Initialization <br/>

### 1. Install Terraform
* Install Terraform<br/>
#### Linux & macOS
```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform
```
### Verify Installation
```bash
terraform -v
```
### Initialize Terraform
```bash
terraform init
```
### 2. Install AWS CLI
AWS CLI (Command Line Interface) allows you to interact with AWS services directly from the command line.

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install
```

```bash
aws configure
```

> #### This will prompt you to enter:<br/>
- **AWS Access Key ID:**<br/>
- **AWS Secret Access Key:**<br/>
- **Default region name:** `eu-west-1`<br/>
- **Default output format:** `json`<br/>

> [!NOTE] 
> Make sure the IAM user you're using has the necessary permissions. You'll need an AWS IAM Role with programmatic access enabled.

## Getting Started

> Follow the steps below to get your infrastructure up and running using Terraform:<br/>

1. **Clone the Repository:**
First, clone this repo to your local machine:<br/>
```bash
git clone https://github.com/sauravmishra07/Jobportal-DevOps-Project.git
cd jobportal-yt/terraform
```
2. **Generate SSH Key Pair:**
Create a new SSH key to access your EC2 instance:
```bash
ssh-keygen -f jobportal-key
```
This will prompt you to create a new key file named `jobportal-key`.

3. **Private key permission:** Change your private key permission:
```bash
chmod 400 jobportal-key
```

4. **Initialize Terraform:**
Initialize the Terraform working directory to download required providers:
```bash
terraform init
```
5. **Review the Execution Plan:**
Before applying changes, always check the execution plan:
```bash
terraform plan
```
6. **Apply the Configuration:**
Now, apply the changes and create the infrastructure:
```bash
terraform apply
```
> Confirm with `yes` when prompted.

7. **Access Your EC2 Instance:** <br/>
After deployment, grab the public IP (`54.76.194.89`) from terraform output or AWS Console:
```bash
ssh -i jobportal-key ubuntu@54.76.194.89
```
8. **Update your kubeconfig:**
wherever you want to access your EKS whether it is your local machine or bastion server, this command will help:
> [!CAUTION]
> you need to configure aws cli first to execute this command:

```bash
aws configure
```

```bash
aws eks --region eu-west-1 update-kubeconfig --name jobportal-vpc
```
9. **Check your cluster:**
```bash
kubectl get nodes
```

## Jenkins Setup Steps
> [!TIP]
> Check if jenkins service is running:

```bash
sudo systemctl status jenkins
```
## Steps to Access Jenkins & Install Plugins

#### 1. **Open Jenkins in Browser:**
> Use your public IP with port 8080:
>**http://54.76.194.89:8080**

#### 2. **Initial Admin password:**
> Start the service and get the Jenkins initial admin password:
> ```bash
> sudo cat /var/lib/jenkins/secrets/initialAdminPassword
> ```

#### 3. **Start Jenkins (*If Not Running*):**
> Get the Jenkins initial admin password:
> ```bash
> sudo systemctl enable jenkins
> sudo systemctl restart jenkins
> ```
#### 4. **Install Essential Plugins:**
> - Navigate to:
> **Manage Jenkins → Plugins → Available Plugins**<br/>
> - Search and install the following:<br/>
>   - **Docker Pipeline**<br/>
>   - **Pipeline View**

#### 5. **Set Up Docker & GitHub Credentials in Jenkins (Global Credentials)**<br/>
>
> - GitHub Credentials:
>   - Go to:
**Jenkins → Manage Jenkins → Credentials → (Global) → Add Credentials**
> - Use:
>   - Kind: **Username with password**
>   - ID: **github-credentials**<br/>

> - DockerHub Credentials:
> Go to the same Global Credentials section
> - Use:
>   - Kind: **Username with password**
>   - ID: **docker-hub-credentials**
> [Notes:]
> Use these IDs in your Jenkins pipeline for secure access to GitHub and DockerHub

#### 6. Jenkins Shared Library Setup:
> - `Configure Trusted Pipeline Library`:
>   - Go to:
> **Jenkins → Manage Jenkins → Configure System**
> Scroll to Global Pipeline Libraries section
>
> - **Add a New Shared Library:** 
> - **Name:** `shared`
> - **Default Version:** `main`
> - **Project Repository URL:** `https://github.com/sauravmishra07/jenkins-shared-libraries`

> [Notes:] 
> Make sure the repo contains proper `vars/update_k8s_manifests.groovy`

#### 7. Setup Pipeline<br/>
> - Create New Pipeline Job<br/>
>   - **Name:** `JobPortal`<br/>
>   - **Type:** Pipeline<br/>
> Press `OK`<br/>

> > In **General**<br/>
> > - **Description:** JobPortal CI/CD<br/>
> > - **Check the box:** `GitHub project`<br/>
> > - **GitHub Repo URL:** `https://github.com/sauravmishra07/Jobportal-DevOps-Project`<br/>
>
> > In **Trigger**<br/>
> > - **Check the box:** `GitHub hook trigger for GITScm polling`<br/>
>
> > In **Pipeline**<br/>
> > - **Definition:** `Pipeline script from SCM`<br/>
> > - **SCM:** `Git`<br/>
> > - **Repository URL:** `https://github.com/sauravmishra07/Jobportal-DevOps-Project`<br/>
> > - **Credentials:** `github-credentials`<br/>
> > - **Branch:** `main`<br/>
> > - **Script Path:** `Jenkinsfile`<br/>

#### **Fork Required Repos**<br/>
> > Fork App Repo:
> > * Open the `Jenkinsfile`
> > * DockerHub username is already `sauravmishra07`

> > **Fork Shared Library Repo:**
> > * Edit `vars/update_k8s_manifests.groovy`
> > * Update image names if needed

> **Setup Webhook**
> In GitHub:
>  * Go to `Settings → Webhooks`
>  * Add webhook: `http://54.76.194.89:8080/github-webhook/`
>  * Select `GitHub hook trigger for GITScm polling` in Jenkins job

> **Trigger the Pipeline**
> Click `Build Now` in Jenkins

#### **8. CD – Continuous Deployment Setup**<br/>
**Prerequisites:**<br/>
Before configuring CD, make sure the following tools are installed:<br/>
* Installations Required:<br/>
**kubectl** | **AWS CLI** | **helm**

**SSH into Bastion Server**<br/>
* Connect to your EC2 bastion:
```bash
ssh -i jobportal-key ubuntu@54.76.194.89
```

**8. Configure AWS CLI on Bastion Server**
```bash
aws configure
```

**9. Update Kubeconfig for EKS**<br/>
```bash
aws eks update-kubeconfig --region eu-west-1 --name jobportal-vpc
```

**10. Argo CD Setup**<br/>
Create a Namespace for Argo CD<br/>
```bash
kubectl create namespace argocd
```
1. Install Argo CD using Manifest
```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
2. Watch Pod Creation
```bash
watch kubectl get pods -n argocd
```

3. Check Argo CD Services
```bash
kubectl get svc -n argocd
```

4. Change Argo CD Server Service to NodePort
```bash
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'
```

11. Access Argo CD GUI<br/>
Check Argo CD Server Port:
```bash
kubectl get svc -n argocd
```
Port forward:
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443 --address=0.0.0.0 &
```
Open: `https://54.76.194.89:8080`

Get Argo CD Admin Password<br/>
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```
* Username: `admin`

### **Deploy Your Application in Argo CD GUI**<br/>

> 1. On Argo CD homepage → **"New App"**

> 2. Fill details:
>  - **Application Name:** `jobportal`
>  - **Project Name:** `default`
>  - **Sync Policy:** `Automatic`

> 3. **Source**:
> - **Repo URL:** `https://github.com/sauravmishra07/Jobportal-DevOps-Project`
> - **Path:** `jobportal-yt/kubernetes`

> 4. **Destination**:
>  - **Cluster URL:** `https://kubernetes.default.svc`
>  - **Namespace:** `jobportal`

> 5. Click **"Create"**

## Nginx ingress controller:<br/>
> 1. Install the Nginx Ingress Controller using Helm:
```bash
kubectl create namespace ingress-nginx
```
> 2. Add Helm repo:
```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```
> 3. Install:
```bash
helm install nginx-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --set controller.service.type=LoadBalancer
```
> 4. Check pods:
```bash
kubectl get pods -n ingress-nginx
```
> 5. Get external IP:
```bash
kubectl get svc -n ingress-nginx
```

## Install Cert-Manager

> 1. Add Jetstack Helm repo:
```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
```
> 2. Install Cert-Manager:
```bash
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.12.0 \
  --set installCRDs=true
``` 
> 3. Check pods:
```bash
kubectl get pods -n cert-manager
```

> 4. Apply ClusterIssuer:
```bash
kubectl apply -f kubernetes/00-cluster-issuer.yml
```

### **HTTPS:**
> **Your manifests are ready:**
> - `04-configmap.yml` → Contains JWT_SECRET, CLOUDINARY keys, MongoDB Atlas URI
> - `09-ingress.yml` → Auto TLS with `cert-manager.io/cluster-issuer: letsencrypt-prod`

> **Apply manifests:**
```bash
kubectl apply -f jobportal-yt/kubernetes/ -n jobportal
```

> **Status checks:**
```bash
kubectl get certificate -n jobportal
kubectl describe ingress jobportal-ingress -n jobportal
kubectl logs -n cert-manager -l app=cert-manager
kubectl get challenges -n jobportal
```

## **Congratulations!** <br/>
**Your JobPortal is Live!** 🎉

**URLs:**
- NodePort: `http://54.76.194.89:30000`
- Ingress: `http://54.76.194.89.nip.io`

![JobPortal Deployed](./frontend/public/jobportal-screenshot.png)

### Production Ready Job Portal ✅
