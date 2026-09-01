# Changesets 工作流说明

本项目使用 [Changesets](https://github.com/changesets/changesets) 管理版本和 Changelog。

## 日常开发流程

1. **开发完成后，添加 changeset**

   ```bash
   pnpm changeset
   ```

   按提示选择 semver 类型（patch / minor / major）并输入本次变更描述。这会在 `.changeset/` 目录下生成一个临时 Markdown 文件。

2. **将该文件和代码变更一起提交**

   ```bash
   git add .changeset/<生成的文件>.md
   git commit -m "feat: ..."
   ```

## 发版流程

1. **汇总 changesets，更新 package.json 版本号和 CHANGELOG**

   ```bash
   pnpm version-packages
   ```

2. **发布到 npm**

   ```bash
   pnpm release
   ```

> `release` 脚本对应 `changeset publish`，会自动为每个发布的包打 git tag。
