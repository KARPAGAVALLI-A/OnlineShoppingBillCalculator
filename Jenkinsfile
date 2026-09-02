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
                
                sh "cp -R build/* ${env.DEPLOY_PATH}"
            }
        }
    }

    post {
        success {
            echo 'Deployment successful! Sending notifications...'
            sh """
                curl -H "Content-Type: application/json" \
                -X POST \
                -d '{"content": "✅ **Deployment Success Alert**: React Online Shopping Bill Calculator has been successfully deployed! Commit: ${env.GIT_COMMIT.take(7)} on branch ${env.BRANCH_NAME}."}' \
                ${env.DISCORD_WEBHOOK}
            """
        }
        failure {
            echo 'Pipeline execution failure detected. Alerting engineering team...'
            sh """
                curl -H "Content-Type: application/json" \
                -X POST \
                -d '{"content": "🚨 **Deployment Failure Alert**: Pipeline build failed during execution for commit: ${env.GIT_COMMIT.take(7)}. Check the Jenkins console logs immediately."}' \
                ${env.DISCORD_WEBHOOK}
            """
        }
    }
}
