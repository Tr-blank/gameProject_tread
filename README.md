---
title: Blogging Like a Hacker
---
# 練習 - 踩地雷

## branch 規範
- master : 正式版
- develop : 開發測試版
- feature-* : 由develop分支開發版，依功能最小單位做區分，由實作的功能命名，開發完成會合併到develop
- release-* : 由develop分支下一版本，由版本號命名，發布時會合併到develop跟master
- hotfixes-* : 由master分支，由正式版中發現的bug命名，修復後合併到master和release

## 依賴
- vuepress
```
yarn global add vuepress # OR npm install -g vuepress
```
- pixi.js

## 協助開發

```
git clone https://github.com/Tr-blank/gameProject_tread.git

npm run dev
```



