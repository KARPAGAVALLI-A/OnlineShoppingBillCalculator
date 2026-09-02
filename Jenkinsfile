pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment {
        DEPLOY_PATH = '/var/www/html/shopping-bill-calculator'
        DISCORD_WEBHOOK = 'https://discord.com'
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
                echo 'Installing node application packages...'
                sh 'npm install'
            }
        }

        stage('Execute Compilation Build') {
            steps {
                echo 'Compiling optimized distribution artifacts...'
                sh 'npm run build'
            }
        }

        stage('Deploy Live Application') {
            steps {
                echo "Deploying production build assets to ${env.DEPLOY_PATH}..."

                sh '''
                    mkdir -p "$DEPLOY_PATH"
                    cp -R dist/* "$DEPLOY_PATH/"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Pipeline execution failure detected.'
        }
    }
}
