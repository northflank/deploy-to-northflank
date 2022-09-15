<div align="center">

# Deploy to Northflank

[![GitHub release](https://img.shields.io/github/v/release/northflank/deploy-to-northflank.svg?style=flat-square)](https://github.com/northflank/deploy-to-northflank/releases)
[![GitHub release](https://img.shields.io/github/license/northflank/deploy-to-northflank.svg?style=flat-square)](https://github.com/northflank/deploy-to-northflank/blob/master/LICENSE)

<br>

[![GitHub issues](https://img.shields.io/github/issues/northflank/deploy-to-northflank.svg?style=flat-square)](https://github.com/northflank/deploy-to-northflank/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/northflank/deploy-to-northflank.svg?style=flat-square)](https://github.com/northflank/deploy-to-northflank/pulls)
[![GitHub issues](https://img.shields.io/github/stars/northflank/deploy-to-northflank.svg?style=flat-square)](https://github.com/northflank/deploy-to-northflank/stargazers)

<br><br>
</div>

## About
The "Deploy to Northflank" GitHub action allows you to deploy Docker images to Northflank by updating the deployment configuration of existing services or jobs.

## Usage
See [action.yml](action.yml)

```yaml
steps:
    - name: Deploy to Northflank
      uses: northflank/deploy-to-northflank@v1
      with:
        northflank-api-key: ${{ secrets.NORTHFLANK_API_KEY }}
        project-id: ${{ env.PROJECT_ID }}
        service-id: ${{ env.SERVICE_ID }}
        image-path: ${{ steps.meta.outputs.tags }}
        credentials-id: ${{ env.CREDENTIALS_ID }}
```

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)