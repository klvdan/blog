---
title: Installation Of MySQL/Redis/Mongo/Rabbit On Ubuntu 18.04
date: 2020-07-10
sidebar: auto
---

## 1. Install mysql (3306)
```bash
# 1. Installation
$ sudo apt-get update
$ sudo apt-get install mysql-server mysql-client
# 2. Configure Password
$ sudo service mysql start
$ systemctl status mysql.service
$ sudo mysql_secure_installation
# <1>
VALIDATE PASSWORD PLUGIN can be used to test passwords...
Press y|Y for Yes, any other key for No: 

# <2>
Please set the password for root here...
New password: 
Re-enter new password: 

# <3>
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them...
Remove anonymous users? (Press y|Y for Yes, any other key for No) : 

# <4>
Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network...
Disallow root login remotely? (Press y|Y for Yes, any other key for No) :  

# <5>
By default, MySQL comes with a database named 'test' that
anyone can access...
Remove test database and access to it? (Press y|Y for Yes, any other key for No) : 

# <6>
Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.
Reload privilege tables now? (Press y|Y for Yes, any other key for No) : 

# 3. login
$ sudo mysql -u root -p
Enter password:
mysql> show databases;
```

## 2. Install Redis (6379)
```bash
# 1. install
$ sudo apt-get install redis-server
# 2. start service
$ sudo service redis-server start
# 3. cli
$ redis-cli
127.0.0.1:6379> keys *
```

## 3. Install MongoDb (27017)
```bash
# 1. install
$ sudo apt-get install mongodb
# 2. start service
$ sudo service mongo start
# 3. cli
$ mongo
> show dbs
# 3.1. create database
> use test
# 3.2. create owner
 > db.createUser(
... {
...   user: "root",
...   pwd: "admin",
...   roles: [ { role: "dbOwner", db: "test" } ]
...  }
... )
# 3.3. connect  ip:27017/test user:root pass:admin 
```

## 4. Install Rabbitmq (5672)
```bash
# 1. install
$ sudo apt-get install erlang-nox
$ sudo apt-get install rabbitmq-server
# 2. start service
$ sudo service rabbitmq-server start
# 3. create user
$ sudo rabbitmqctl add_user rabbit pwd
$ sudo rabbitmqctl set_user_tags rabbit administrator
$ sudo rabbitmqctl set_permissions -p / rabbit '.*' '.*' '.*'
```