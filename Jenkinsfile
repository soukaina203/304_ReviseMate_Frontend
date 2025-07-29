#!groovy

node {
    def apps = [
        [name: "revise-mate", port: '4200', exposed_port: '', path: '', domaine: "cloud.dev-solus.com"],
    ]

    def app

    stage('Initialize') {
        def dockerHome = tool 'myDocker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }

    stage('Cloning Git') {
        def commit = checkout scm
        def currentCommit = commit.GIT_COMMIT
        def lastCommit = commit.GIT_PREVIOUS_SUCCESSFUL_COMMIT

        lastCommit = lastCommit == null || lastCommit.trim() == '' ? 'HEAD^' : lastCommit
        def command = "git diff-tree -r --name-only ${currentCommit} ${lastCommit}"
        def changes0 = sh(script: command, returnStdout: true).trim()
        println("----------------------------------> ${changes0}")

        script {
            apps.each { e ->
                def changes = sh(script: "${command} -- ./${e.path}", returnStdout: true).trim()

                println("***********************> ${changes}")

                echo "Building Docker image for ${e.name}..."
                app = docker.build("${e.name}", "-t ${e.name} -f ./dockerfile ./${e.path}")

                try {
                    sh "docker rm --force ${e.name}"
                } catch (Exception ex) {
                    echo 'Exception occurred while removing old container: ' + ex.toString()
                }

                if (e.exposed_port == "") {
                    sh """
                        docker run -d \
                        --restart unless-stopped \
                        --network proxy \
                        --label traefik.enable=true \
                        --label traefik.http.routers.${e.name}.tls=true \
                        --label traefik.http.routers.${e.name}.tls.certresolver=letsencrypt \
                        --label traefik.http.routers.${e.name}.rule='Host(`${e.domaine}`)' \
                        --label traefik.http.services.${e.name}.loadbalancer.server.port=${e.port} \
                        --name ${e.name} \
                        ${e.name}
                    """
                } else {
                    sh """
                        docker run -d \
                        --restart unless-stopped \
                        --publish ${e.exposed_port}:${e.port} \
                        --name ${e.name} \
                        ${e.name}
                    """
                }

                sh "docker rmi --force ${e.name}"
            }
        }
    }
}
