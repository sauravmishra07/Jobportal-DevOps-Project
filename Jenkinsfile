@Library('Shared') _

pipeline {
agent any

environment {
    // Update the main app image name to match the deployment files
    DOCKER_IMAGE_NAME = "sauravmishra07/jobportal-app"
    DOCKER_IMAGE_TAG  = "${BUILD_NUMBER}"
    GITHUB_CREDENTIALS = credentials('github-credentials')
    GITHUB_BRANCH = "main"
}

stages {

    stage('Cleanup Workspace') {
        steps {
            script {
                cleanWs()
            }
        }
    }

    stage('Clone Repository') {
        steps {
            script {
                clone(
                    'https://github.com/sauravmishra07/Jobportal-DevOps-Project.git',
                    "main"
                )
            }
        }
    }

    stage('Build Docker Image') {
        steps {
            script {
                docker_build(
                    imageName: env.DOCKER_IMAGE_NAME,
                    imageTag: env.DOCKER_IMAGE_TAG,
                    dockerfile: 'Dockerfile',
                    context: '.'
                )
            }
        }
    }

    stage('Push Docker Image') {
        steps {
            script {
                docker_push(
                    imageName: env.DOCKER_IMAGE_NAME,
                    imageTag: env.DOCKER_IMAGE_TAG
                )
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
