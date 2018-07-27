#!/bin/bash
TARGET_DOMAIN="rsync://data.chunyu.me"
# biz
_DEFAULT_TEST_BUSINESS_DIR=$TARGET_DOMAIN'/projects/biztest/chronic-disease/data/'
# 部署目标目录
TARGET_DIR=$_DEFAULT_TEST_BUSINESS_DIR
echo "==========TARGET_DIR================="
echo $TARGET_DIR

# 当前分支
function git_branch {
   branch="`git branch 2>/dev/null | grep "^\*" | sed -e "s/^\*\ //"`"
   if [ "${branch}" != "" ];then
       if [ "${branch}" = "(no branch)" ];then
           branch="(`git rev-parse --short HEAD`...)"
       fi
       echo "$branch"
   fi
}
CURRENT_BRANCH=$(git_branch)
echo "******************当前分支:"
echo $CURRENT_BRANCH
echo "******************1.测试分支更新*****************************"
git reset --hard || { echo "command failed ==== "; exit 1; }
git checkout feature/test || { echo "command failed ===="; exit 1; }
git pull origin feature/test || { echo "command failed ===="; exit 1; }
git merge $CURRENT_BRANCH || { echo "command failed ===="; exit 1; }
git push origin || { echo "command failed ===="; exit 1; }

echo "******************2.代码本地 webpack 构建开始******************"
#npm install
npm run biz || { echo "command failed"; exit 1; }
#npm run test || { echo "command failed"; exit 1; }
echo "******************代码本地编译构建结束*************************"

echo "******************3.同步资源到远程目标机器*********************"
# 同步静态资源
rsync -avP --delete ./dist/static/vue_cdm_cms/ $TARGET_DIR'/static/vue_cdm_cms/' || { echo "command failed"; exit 1; }
# 同步index.html
rsync -avP --delete ./dist/index.html $TARGET_DIR'/templates/pc/' || { echo "command failed"; exit 1; }
echo "*****************************同步完成*************************"
git checkout $CURRENT_BRANCH
echo '******************7.发布成功******************'
