---
title: Ubuntu Docker安装
date: 2020-07-08
sidebar: auto
---

## 1. 更新Ubuntu的apt源索引
```bash
$ sudo apt-get update
```

## 2. 安装包允许apt通过HTTPS使用仓库
```bash
$ sudo dpkg --configure -a
$ sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```

## 3. 添加Docker官方GPG key
```bash
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

## 4. 设置Docker稳定版仓库
```bash
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

## 5. 更新apt源索引
```bash
$ sudo apt-get update
```

## 6. 安装最新版本Docker CE（社区版）
```bash
$ sudo apt-get install docker-ce
```

## 7. 启动服务
```bash
$ sudo service docker start
# 关闭服务
$ sudo service docker stop
```

## 8. 拉取常用镜像
```bash
$ sudo docker pull mysql
$ sudo docker pull mongo
$ sudo docker pull redis
$ sudo docker pull rabbitmq
```

## 9. 启动容器
- 查看已下载的镜像
```bash
$ sudo docker images
```

- 启动MySQL容器
```bash
# 首次启动
$ sudo docker run -it -e MYSQL_ROOT_PASSWORD=admin -p 3306:3306 -d mysql
# 非首次启动，先查看cid,再用cid启动容器
$ sudo docker ps -l
$ sudo docker start <cid>
# 进入命令行
$ sudo docker exec -it <cid> bash
> mysql -u root -p
mysql> create database xx;
mysql> exit
# 停止容器
$ sudo docker stop <cid>
# 删除容器
$ sudo docker rm <cid>
# 删除镜像，先查看镜像id，再用镜像id删除
$ sudo docker images
$ sudo docker rmi <id>
```

- 启动redis
```bash
$ sudo docker run -it -p 6379:6379 -d redis
```

- 启动mongo
```bash
$ sudo docker run -it -p 27017:27017 -d mongo
# 进入命令行
$ sudo docker exec -it <cid> bash
# 配置用户密码
$ mongo
 > use admin
 > db.createUser(
... {
...   user: "root",
...   pwd: "admin",
...   roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
...  }
... )
Successfully added user: {
    "user" : "root",
    "roles" : [
        {
            "role" : "userAdminAnyDatabase",
            "db" : "admin"
        }
    ]
}
 > db.auth("root", "admin")
 > quit()

# 为数据库创建用户
 > db.createUser(
... {
...   user: "root",
...   pwd: "admin",
...   roles: [ { role: "dbOwner", db: "test" } ]
...  }
... )
Successfully added user: {
    "user" : "root",
    "roles" : [
        {
            "role" : "dbOwner",
            "db" : "test"
        }
    ]
} 
```

- 启动rabbitmq
```bash
$ sudo docker run -it -p 5672:5672 -d rabbitmq
# 进入命令行
$ sudo docker exec -it <cid> bash
# 添加用户
> rabbitmqctl add_user rabbit pwd
> rabbitmqctl set_user_tags rabbit administrator
> rabbitmqctl set_permissions -p / rabbit '.*' '.*' '.*'
```

## 10. 停止所有容器的脚本
```bash
#!/bin/bash

ll=`docker ps | awk '{print $1}' | sed '1d'`

for ss in $ll
do
	docker stop $ss
done
```