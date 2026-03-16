@Library('shared') _

pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "sauravmishra07/jobportal-app"
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        GITHUB_CREDENTIALS = credentials('github-credentials')
        GITHUB_BRANCH = "main"
    }

    stages {

        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone Repository') {
            steps {
                git branch: env.GITHUB_BRANCH,
                    credentialsId: env.GITHUB_CREDENTIALS,
                    url: 'https://github.com/sauravmishra07/Jobportal-DevOps-Project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build frontend image
                    def frontendImage = docker.build(
                        "${env.DOCKER_IMAGE_NAME}-frontend:${env.DOCKER_IMAGE_TAG}",
                        "-f frontend/Dockerfile frontend"
                    )

                    // Build backend image
                    def backendImage = docker.build(
                        "${env.DOCKER_IMAGE_NAME}-backend:${env.DOCKER_IMAGE_TAG}",
                        "-f backend/Dockerfile backend"
                    )
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        // Push frontend
                        docker.image("${env.DOCKER_IMAGE_NAME}-frontend:${env.DOCKER_IMAGE_TAG}").push()
                        docker.image("${env.DOCKER_IMAGE_NAME}-frontend:${env.DOCKER_IMAGE_TAG}").push('latest')

                        // Push backend
                        docker.image("${env.DOCKER_IMAGE_NAME}-backend:${env.DOCKER_IMAGE_TAG}").push()
                        docker.image("${env.DOCKER_IMAGE_NAME}-backend:${env.DOCKER_IMAGE_TAG}").push('latest')
                    }
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                script {
                    update_k8s_manifests(
                        imageTag: env.DOCKER_IMAGE_TAG,
                        manifestsPath: 'kubernetes',
                        gitCredentials: 'github-credentials',
                        gitUserName: 'Jenkins CI',
                        gitUserEmail: 'sauravmishra499@gmail.com'
                    )
                }
            }
        }
    }
}
