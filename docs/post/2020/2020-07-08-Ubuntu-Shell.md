---
title: shell 脚本学习笔记
date: 2020-07-08
sidebar: auto
---

## 1. 定义执行器 
```shell
#！/bin/bash
```

## 2. 变量
```shell
myVar = "test string0"
my_var = "test string1"
myVar2 = "test string2"
_var = "test string3"
MY_VAR = "test string4"

## 通过语句为变量复制
for file in `ls .`
## or
for file in $(ls .)
```

## 3. 使用变量
```shell
echo $myVar
echo ${myVar}
for skill in CPP GO JAVA; do
	echo "I'm good at ${skill} language."
done
```

## 4. 只读变量
```shell
my_var3 = "test str5"
readonly my_var3
```

## 5.  删除变量
```shell
my_var4 = "test str6"
unset my_var4
```

## 6.  单引号变量
字符串原样输出，不支持转义、变量
```shell
my_var5 = 'test str7'
```

## 7. 双引号变量 
字符串支持转义、变量
```shell
my_var6 = "test \"${my_var5}8\""
```

## 8. 字符串拼接
```shell
my_var7 = "a "${my_var6}" c"
my_var7_1 = "a ${my_var6} c"
my_var8 = 'a '${my_var7}' c'
```

## 9. 字符串长度
```shell
my_var9 = "test str9"
echo ${#my_var9}
```

## 10. 子字符串
```shell
my_var10 = "I'm learning shell"
my_var10_1 = ${my_var10:1:4}
```

## 11. 查找字符位置
```shell
my_var11 = "fall into love river"
### i或o第一次出现的位置5
echo `expr index "${my_var11}" io` 
```

## 12. 数组
```shell
my_var12 = (1 2 3)
my_var13 = (
1
2
3
)
my_var14[0] = 1
my_var14[1] = 2
```

## 13. 读取数组
```shell
my_var15 = (1 2 3)
echo ${my_var15[0]}
### 读取全部[@]
echo ${my_var15[@]}
```

## 14. 数组长度
```shell
my_var16 = ("hi" "k" "so")
echo ${#my_var16[@]}
echo ${#my_var16[*]}
echo ${#my_var16[0]}
```

## 15. 注释
```shell
#------------
# 这是一个注释
#------------
####### 描述开始 #######
# 这里描述
####### 描述结束 #######

:<<EOF
这是多行注释
EOF
:<<!!
这也是多行注释
!!
```

## 16. 命令行参数
```shell
echo "执行文件名: $0"
echo "第一个参数: $1"
echo "第二个参数: $2"
echo "参数个数: $#"
echo "以一个单字符串显示所有参数: $* 等于 $1 $2 ..."
echo "以一个单字符串显示所有参数: $@ 等于 $1 $2 ..."
echo "脚本运行的当前进程ID号: $$"
echo "后台运行的最后一个进程ID号: $!"
echo "显示当前使用的选项: $-"
echo "显示最后命令的退出状态,0表示正常退出: $?"

## $@与$*的区别
for i in $($@) do
	echo $i
done
:<<!!
-- $@ --
"1"
"2"
"3"
!!
for i in $($*) do
	echo $i
done
:<<!!
-- $* --
"1 2 3"
!!
```

## 17. 基本运算符
```shell
my_a17 = 1
my_b17 = 2
echo `expr ${my_a17} + ${my_b17}`
echo `expr ${my_a17} - ${my_b17}`
echo `expr ${my_a17} * ${my_b17}`
echo `expr ${my_a17} / ${my_b17}`
echo `expr ${my_a17} % ${my_b17}`
if [ $my_a17 == $my_b17 ] then
	echo "${my_a17} = ${my_b17}"
fi
if [ $my_a17 != $my_b17 ] then
	echo "${my_a17} != ${my_b17}"
fi
```

## 18. 关系运算符
参数     |说明
:-      |:-
-eq     |  ==
-ne     |  !=
-gt     |   >
-lt     |   <
-ge     |   >=
-le     |   <=
```shell
my_a18 = 1
my_b18 = 2
if [ $my_a18 -eq $my_b18 ] then
	echo "$my_a18 equals to $my_b18"
else
	echo "$my_a18 doesn't equal to $my_b18"
fi
```

## 19. 布尔运算符
参数     |说明
:-      |:-
!		|  非运算
-o  	|  或运算
-a 		|  与运算
```shell
my_a19 = 1
my_b19 = 2
if [ $my_a19 -gt 0 -a $my_a19 -lt $my_b19 ] then
	echo "0 < ${my_a19} < ${my_b19}"
fi
```

## 20. 逻辑运算
参数     |说明
:-      |:-
&& 	    | 逻辑与
||	    | 逻辑或
```shell
my_a20 = 1
my_b20 = 2
if [ $my_a20 -gt 0 && $my_a20 -lt $my_b20 ] then
	echo "0 < ${my_a20} < ${my_b20}"
fi
```

## 21. 字符串运算
参数            |说明
:-              |:-
[ $a = $b ]     |	相等
[ $a != $b ]    |   不等
[ -z $a ]	 	|	长度为0
[ -n $a ]		|	长度不为0
[ $a ]			|	字符串为空
```shell
my_a21 = "a"
my_b21 = "b"
if [ $my_a21 ] then
	echo "${my_a21} 不为空"
fi
if [ -z $my_a21 ] then
	echo "${my_a21} 长度为0"
fi
```

## 22. 文件测试运算
参数            |说明
:-              |:-
[ -b file ]     |是否是块文件
[ -c file ]     |是否是字符设备
[ -d file ]     |是否是目录
[ -f file ]     |是否是普通文件（非目录、非设备）
[ -g file ]     |是否设置了SGID位
[ -k file ]     |是否设置了粘着位
[ -p file ]     |是否是有名管道
[ -u file ]     |是否设置了SUID位
[ -r file ]     |是否可读
[ -w file ]     |是否可写
[ -s file ]     |是否为空
[ -x file ]     |是否可执行
[ -e file ]     |是否存在
[ -S file ]     |是否socket
[ -L file ]     |是否存在且是符号链接
```shell
my_file1 = "${HOME}/logs/info.txt"
if [ -e $my_file1 ] then
	echo "${my_file1} 文件存在"
fi
```

## 23. echo
参数     |说明
:-      |:-
\t	    |制表符
\v 	    |垂直制表符
\n 	    |换行
\c 	    |不换行
-e 	    |开启转义
``	    |命令结果
```shell
echo -e "hi \c"
echo `date`
```

## 24. printf
参数     |说明
:-      |:-
%s  	|字符串
%c		|字符
%d		|整数
%f		|小数
-		|左对齐
.x		|x位小数
```shell
printf "%-10s %c %d %-2.2f" 你好 A 12 421.124
```

## 25. test
```shell
mVar1 = 100
mVar2 = 100
if test $[mVar1] -eq $[mVar2] then
	echo "相等"
fi
```

## 26. if
```shell
if [ true ] then
	echo "if"
elif [ 1 -lt 10 ] then
	echo "elif"
else
	echo "else"
fi
```

## 27. for
```shell
for loop in 1 2 3 4 5 do
	echo $loop
done
```

## 28. while
```shell
i = 0
while(( $i -lt 10 )) do
	echo $i
	let "i++"
done

echo -n "输入: "
while read inp do
	echo $inp
done
```

## 29. until
```shell
a = 0
until [ a -ge 10 ] do
	echo $a
	a = `expr $a + 1`
done
```

## 30. 无限循环
```shell
while : do
	echo ""
done
while true do
	echo ""
done
for (( ; ; )) do
	echo ""
done
```

## 31. case
```shell
echo -n "input: "
read inp
case $inp in
	1) 
		echo "1" 
	;;
	2) 
		echo "2" 
	;;
	3|4|5) 
		echo "3,4,5"
	;;
	6) echo "6"
		continue
	;;
	*) echo "other"
		break
	;;
esac
```

## 32. 函数
```shell
foo() {
	echo -n "input"
	read inp
	return $inp
}
foo
echo "inputed: $?"

foo1() {
	echo "第一个参数: $1"
	echo "第二个参数: $2"
	echo "参数个数: $#"
	echo "一个字符串输出所有参数: $*"
	expr $1 + $2
}
foo1 1 2
echo "1 + 2 = $?"
```

## 33. 输入/输出重定向
参数     |说明
:-      |:-
> file 	|输出到文件
< file  |从文件输入
>> file |追加到文件
file1 >& file2 |将输出文件合并
file1 <& file2 |将输入文件合并
0 |STDIN标准输入 
1 |STDOUT标准输出
2 |STDERR标准错误输出
```shell
echo "hello" > ~/hi.txt 2>&1
```

## 34. 文件包含
```shell
. ~/hi.sh
source ~/hi.sh
. ../log.sh
```