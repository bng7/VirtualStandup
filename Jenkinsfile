pipeline {
    agent any
    
    tools {nodejs "node"}
    
    stages{
        stage('deploy') {
            steps {
                sh './scripts/deploy'
            }
        }
    }
}