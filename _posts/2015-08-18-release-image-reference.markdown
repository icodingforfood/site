---
layout: post
title:  "release image reference"
date:   2015-08-18 19:00:58
categories: tech post
---
在我们使用Image绑定图片资源时，如果有另外一个进程去修改被引用的资源是会抛资源被另外一进程占用
解决方案：使用CacheOption = "OnLoad", 它会在图片加载的时候将其Cache住，解除与资源的引用
<Image>
    <Image.Source>
        <BitmapImage  CacheOption="OnLoad" UriSource="C:\Users\i.mark.yu\Desktop\HelloWorld.png"/>
    </Image.Source>
</Image>