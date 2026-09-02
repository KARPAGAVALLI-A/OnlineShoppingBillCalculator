pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment {
        DEPLOY_PATH = '/var/www/html/shopping-bill-calculator'
    }

    stages {

        stage('Checkout Source') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building React application...'
                sh 'npm run build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo "Deploying application to ${env.DEPLOY_PATH}..."

                sh '''
                    sudo mkdir -p "$DEPLOY_PATH"
                    sudo rm -rf "$DEPLOY_PATH"/*
                    sudo cp -R dist/* "$DEPLOY_PATH/"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }

        failure {
            echo '❌ Deployment failed!'
        }

        always {
            echo 'Jenkins pipeline completed.'
        }
    }
}
