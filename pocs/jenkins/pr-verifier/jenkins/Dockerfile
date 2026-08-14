FROM jenkins/jenkins:lts-jdk17

ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# Plugins needed for GitHub PR verification:
# - github-branch-source: discovers PRs from a GitHub repo automatically
# - workflow-aggregator: pipeline support (Jenkinsfile)
# - credentials-binding: safely inject the GitHub token into pipeline steps
# - git: basic git checkout support
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt