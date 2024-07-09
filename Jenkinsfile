@Library('utils@master') _
import com.lmig.intl.cloud.jenkins.util.EnvConfigUtil

def MAJOR_VERSION = "1"
def ARTIFACT_VERSION = "infrafront-plt.${MAJOR_VERSION}.${BUILD_NUMBER}"

def envUtil = new EnvConfigUtil()
countryParams = envUtil.getCountryEnvDetails(env.JOB_NAME)
def appEnv = countryParams.countryEnv.toLowerCase()

def stackName = "intl-co-oficinalinea-cfn-${appEnv}-infrafront-plt"
def s3Bucket = "intl-co-oficinalinea-s3-${appEnv}-appwebbucket-v2"
def s3Docs = "intl-co-oficinalinea-s3-${appEnv}-storage-docs"
def trouxUid = "3D243AAC-579D-4FE3-8A01-FE6735BDD836"
def ZIP_ARTIFACT = "intl-co-oficinalinea-cfn-prod-infrafront-plt.zip"
def APP_NAME = "intl-co-app-front-oficina-linea-v2"
def envVariables
def envVar

def AppCountry = countryParams.countryCode
def region = 'us-east-1'
def customWorkerImages = ['node=artifactory-emea.aws.lmig.com/cl-low-touch-auto-docker-np-latam/node:14-oracle-slim','sonar-scanner=artifactory-emea.aws.lmig.com/pod-templates-latam/sonarsource/sonar-scanner-cli:4.7']

pipeline {
  agent {
    kubernetes {
        yaml pod(mode:'Declarative', workers:customWorkerImages)
    }
  }

  stages{
    stage('Git Checkout'){
      steps {
        cleanWs()
        checkout scm
        sh "printenv"
      }
    }

    stage("Echo variables") {
      steps {
        script {
          def workspacePath = env.WORKSPACE
          echo "Working in env........................: ${appEnv}"
          echo "Version...............................: ${ARTIFACT_VERSION}"
          echo "StackName.............................: ${stackName}"
          echo "TrouxUid..............................: ${trouxUid}"
          echo "Region................................: ${region}"
          echo "Country:..............................: ${AppCountry}"
          echo "workspacePath:........................: ${workspacePath}"
        }
      }
    }

    stage("Read Environment Variables") {
      steps {
        script {
          dir('.'){
            def workspacePath = env.WORKSPACE
            if (workspacePath.contains("PromoteToProd")){
              appEnv = 'prod'
            }
            
            envVar = readJSON file: 'envVar.json'
            envVariables = """
              export REACT_APP_URL_ENDPOINT_AUTH=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_AUTH} && \
              export REACT_APP_URL_ENDPOINT_UTILS=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_UTILS} && \
              export REACT_APP_URL_ENDPOINT_COMMISSIONS=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_COMMISSIONS} && \
              export REACT_APP_URL_ENDPOINT_REQUESTS=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_REQUESTS} && \
              export REACT_APP_URL_ENDPOINT_PAYROLLS=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_PAYROLLS} && \
              export REACT_APP_URL_ENDPOINT_WEBSOCKET=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_WEBSOCKET} && \
              export REACT_APP_SBU_AUTOS=${envVar./${appEnv}/.REACT_APP_SBU_AUTOS} && \
              export REACT_APP_URL_ENDPOINT_OVERCOMMISSIONS=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_OVERCOMMISSIONS} && \
              export REACT_APP_URL_ENDPOINT_OVERCOMMISSIONSTABLE=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_OVERCOMMISSIONSTABLE} && \
              export REACT_APP_URL_ATTACHMENTS=${envVar./${appEnv}/.REACT_APP_URL_ATTACHMENTS} && \
              export REACT_APP_URL_S3_PUBLICATIONS=${envVar./${appEnv}/.REACT_APP_URL_S3_PUBLICATIONS} && \
              export REACT_APP_URL_SUPPORT=${envVar./${appEnv}/.REACT_APP_URL_SUPPORT} && \
              export REACT_APP_URL_ENDPOINT_REQ_TYPES=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_REQ_TYPES} && \
              export REACT_APP_URL_ENDPOINT_REQUESTS_SARLAFT_ORCHESTRATOR=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_REQUESTS_SARLAFT_ORCHESTRATOR} && \
              export REACT_APP_URL_CHATBOT_SALESFORCE=${envVar./${appEnv}/.REACT_APP_URL_CHATBOT_SALESFORCE} && \
              export REACT_APP_URL_CHATBOT_ENCUESTAS=${envVar./${appEnv}/.REACT_APP_URL_CHATBOT_ENCUESTAS} && \
              export REACT_APP_URL_CHATBOT_AGENT_CONTENT=${envVar./${appEnv}/.REACT_APP_URL_CHATBOT_AGENT_CONTENT} && \
              export REACT_APP_URL_CHATBOT_AGENT=${envVar./${appEnv}/.REACT_APP_URL_CHATBOT_AGENT} && \
              export REACT_APP_URL_CHATBOT_SRC=${envVar./${appEnv}/.REACT_APP_URL_CHATBOT_SRC} && \
              export REACT_APP_URL_RECORD_TYPE=${envVar./${appEnv}/.REACT_APP_URL_RECORD_TYPE} && \
              export REACT_APP_URL_ENDPOINT_LOGIN=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_LOGIN} && \
              export REACT_APP_URL_ENDPOINT_ADMIN_USER=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_ADMIN_USER} && \
              export REACT_APP_URL_FUNDED_PORTFOLIO=${envVar./${appEnv}/.REACT_APP_URL_FUNDED_PORTFOLIO} && \
              export REACT_APP_NAME_LAMBDA_INFO_PENDING_REPORT=${envVar./${appEnv}/.REACT_APP_NAME_LAMBDA_INFO_PENDING_REPORT} && \
              export REACT_APP_URL_ENDPOINT_PORTFOLIO_REPORTS=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_PORTFOLIO_REPORTS} && \
              export REACT_APP_COG_IDENTITY_POOL_ID=${envVar./${appEnv}/.REACT_APP_COG_IDENTITY_POOL_ID} && \
              export REACT_APP_SECRET_MANAGER_NAME=${envVar./${appEnv}/.REACT_APP_SECRET_MANAGER_NAME} && \
              export REACT_APP_URL_ENDPOINT_GET_256_REFER=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_GET_256_REFER} && \
              export REACT_APP_URL_ENDPOINT_GET_128_REFER=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_GET_128_REFER} && \
              export REACT_APP_URL_ENDPOINT_PROD_RENOV_REQUESTS=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_PROD_RENOV_REQUESTS} && \
              export REACT_APP_URL_ENDPOINT_PYME_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_PYME_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_BPM_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_BPM_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_SINISTER_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_SINISTER_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_HOME_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_HOME_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_CARS_V3_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_CARS_V3_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_CARS_V4_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_CARS_V4_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_COLECTIVE_CARS_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_COLECTIVE_CARS_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_IAXIS_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_IAXIS_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_POLICY_MNGMNT_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_POLICY_MNGMNT_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_CERTIFICATIONS=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_CERTIFICATIONS} && \
              export REACT_APP_URL_ENDPOINT_SASIC_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_SASIC_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_SHORTCUTS_GET=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_SHORTCUTS_GET} && \
              export REACT_APP_URL_ENDPOINT_SHORTCUTS_UPDATE=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_SHORTCUTS_UPDATE} && \
              export REACT_APP_URL_ENDPOINT_RENOVATIONS=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_RENOVATIONS} && \
              export REACT_APP_SECRET_KEYAPP=${envVar./${appEnv}/.REACT_APP_SECRET_KEYAPP} && \
              export REACT_APP_SECRET_KEYDES=${envVar./${appEnv}/.REACT_APP_SECRET_KEYDES} && \
              export REACT_APP_URL_ENDPOINT_ADMIN_USER_MAIN_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_ADMIN_USER_MAIN_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_MODULES_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_MODULES_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_GET_MODULES_USER_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_GET_MODULES_USER_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_UPDATE_USER_MANAGED_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_UPDATE_USER_MANAGED_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_INSERT_USER_MANAGED_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_INSERT_USER_MANAGED_REQUEST} && \
              export REACT_APP_URL_ENDPOINT_VALIDATE_USER_MANAGED_REQUEST=${envVar./${appEnv}/.REACT_APP_URL_ENDPOINT_VALIDATE_USER_MANAGED_REQUEST} && \
              export REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY=${envVar./${appEnv}/.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY} && \
              export REACT_APP_ENVIRONTMENT=${envVar./${appEnv}/.REACT_APP_ENVIRONTMENT} && \
              export REACT_APP_APIGEE_SECRET_ID=${envVar./${appEnv}/.REACT_APP_APIGEE_SECRET_ID} && \
              export REACT_APP_APIGEE_CLIENT_SECRET=${envVar./${appEnv}/.REACT_APP_APIGEE_CLIENT_SECRET} && \
              export REACT_APP_APIGEE_GET_TOKEN_URL=${envVar./${appEnv}/.REACT_APP_APIGEE_GET_TOKEN_URL} && \
              export REACT_APP_APIGEE_URL_BASE=${envVar./${appEnv}/.REACT_APP_APIGEE_URL_BASE} && \
              export REACT_APP_GOOGLE_RECAPTCHA_TOKEN=${envVar./${appEnv}/.REACT_APP_GOOGLE_RECAPTCHA_TOKEN} && \
              export REACT_APP_PUBLICATIONS=${envVar./${appEnv}/.REACT_APP_PUBLICATIONS}"""
          }
        }
      }
    }

    stage('Install & Test') {
      steps {
        script {
          container("node") {
            sh 'npm cache clean --force'
            sh 'npm cache verify'
            sh 'node --version'
            sh 'hostname'
            sh 'npm install'
            sh 'npm run test'
          }
        }
      }
    }

    // stage('SonarQube & Quality Gate Analysis') {
    //   steps {
    //     withSonarQubeEnv('sonarqube') {
    //       sh "node_modules/sonar-scanner/bin/sonar-scanner -X -Dproject.settings=sonar-project.properties -Dsonar.projectVersion=${ARTIFACT_VERSION}"
    //     }
    //     sleep(time:5,unit:"SECONDS")

    //     timeout(time: 1, unit: 'MINUTES') {
    //       script  {
    //         def qg = waitForQualityGate()
    //         if (qg.status != 'OK') {
    //           error "Pipeline aborted due to quality gate failure: ${qg.status}"
    //         }
    //       }
    //     }
    //   }
    // }

    stage('Package Project') {
      steps {
        sh "${envVariables} && npm run build"
      }
    }

    stage('Deploy') {
      steps {
        script {
          def workspacePath = env.WORKSPACE
          if (countryParams.countryEnv.toLowerCase() == "dev"){
            deployToDev {
              withAWS(credentials:getAWSCredentialID(environment:"${appEnv}"), region:"${region}") {
                sh "aws s3 --region us-east-1 cp --recursive src/Assets/Docs/ s3://${s3Docs}/attachments/ "
                sh "aws s3 sync build s3://${s3Bucket} --delete"
                sh "aws cloudformation describe-stack-resources --stack-name  ${stackName} --query 'StackResources[0].PhysicalResourceId' --output text > queryCloudFormation.txt"

                def cloudFrontID = readFile file: 'queryCloudFormation.txt'
                cloudFrontID = cloudFrontID.trim()
                sh "aws cloudfront create-invalidation --distribution-id ${cloudFrontID} --paths " + '"/*"'
                sh "aws cloudfront list-invalidations --distribution-id ${cloudFrontID} --query 'InvalidationList.Items[0].Id' --output text > queryCloudFront.txt"
                // def idInvalidationCache = readFile file: 'queryCloudFront.txt'
                // sh "sed -i '2d' queryCloudFront.txt"
                // idInvalidationCache = idInvalidationCache.trim()
                // sh "cat queryCloudFront.txt"
                // sh "aws cloudfront wait invalidation-completed --distribution-id ${cloudFrontID} --id ${idInvalidationCache}"
                // sh "rm queryCloudFormation.txt queryCloudFront.txt"
              }
            }
          }

          if (countryParams.countryEnv.toLowerCase() == "nonprod" && !workspacePath.contains("PromoteToProd")){
            deployToNonProd{
              withAWS(credentials:getAWSCredentialID(environment:"${appEnv}"), region:"${region}") {
                sh "aws s3 --region us-east-1 cp --recursive src/Assets/Docs/ s3://${s3Docs}/attachments/ "
                sh "aws s3 sync build s3://${s3Bucket} --delete"
                sh "aws cloudformation describe-stack-resources --stack-name  ${stackName} --query 'StackResources[0].PhysicalResourceId' --output text > queryCloudFormation.txt"

                def cloudFrontID = readFile file: 'queryCloudFormation.txt'
                cloudFrontID = cloudFrontID.trim()
                sh "aws cloudfront create-invalidation --distribution-id ${cloudFrontID} --paths " + '"/*"'
                sh "aws cloudfront list-invalidations --distribution-id ${cloudFrontID} --query 'InvalidationList.Items[0].Id' --output text > queryCloudFront.txt"
                // def idInvalidationCache = readFile file: 'queryCloudFront.txt'
                // sh "sed -i '2d' queryCloudFront.txt"
                // idInvalidationCache = idInvalidationCache.trim()
                // sh "cat queryCloudFront.txt"
                // sh "aws cloudfront wait invalidation-completed --distribution-id ${cloudFrontID} --id ${idInvalidationCache}"
                // sh "rm queryCloudFormation.txt queryCloudFront.txt"
              }
            }
          }

          if (countryParams.countryEnv.toLowerCase() == "nonprod" && workspacePath.contains("PromoteToProd")){
            dir('.'){
              zip dir: 'build', 
                  glob: '',
                  zipFile: "${ZIP_ARTIFACT}"
              def artifacts = [ZIP_ARTIFACT]
              artifactoryUploadFiles files:artifacts,version:ARTIFACT_VERSION,packageType:'npm',appName:APP_NAME
            }
            
            promoteToProd(
              email: 'andres.gallardo@libertycolombia.com',
              promoteArtifact: true,
              appName:APP_NAME,
              packageType:'npm', 
              version: "${ARTIFACT_VERSION}",
              singleJenkinsfilePattern: true
            ){}
          }
        }
      }
    }
  }

  post {
    always {
      script {
        def from = 'noreply-cdp@libertymutual.com'
        def to = 'b6a2086a.LibertyMutual.onmicrosoft.com@amer.teams.ms'
        def subject = "${appEnv} FrontEnd v2 Deployment: ${currentBuild.fullDisplayName}"
        def body = """
                    Cordial saludo,

                    Se adjunta los resultados obtenidos del job: ${env.JOB_BASE_NAME}

                    Pipeline Status: ${currentBuild.result}
                    Build Job URL: ${env.BUILD_URL}
                    Build No: ${env.BUILD_ID}
                    """

        mail(
          to: to,
          from: from,
          subject: subject,
          body: body
        )
      }
    }
  }
}
