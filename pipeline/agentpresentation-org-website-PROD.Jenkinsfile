pipeline {
    agent any
    options { disableConcurrentBuilds() }

    stages {
        stage('Publish to GH-Pages') {
            steps {
                echo 'Installing dependencies...'
                sh 'yarn install --frozen-lockfile'
                echo 'Building ...'
                sh 'yarn build'
                echo 'Publish gh-pages'

                sshagent (credentials: ['mee-ci']) {
                    sh """
                        git config --global user.email "devops@mee.foundation"
                        git config --global user.name "Devops"

                        git worktree add ../pages gh-pages
                        rm -rf ../pages/* # this won't delete the .git directory
                        cp -rp dist/* ../pages/
                        cp -rp CNAME ../pages/CNAME
                        cd ../pages
                        echo "version: $BUILD_NUMBER" > .version
                        git add -A
                        git commit -m "Deploy new version: $BUILD_NUMBER"
                        git push origin gh-pages
                        cd -
                    """
                }
            }
        }
    }
}
