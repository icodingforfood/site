---
layout: post
title:  "wpf calendar control mouse capture issue"
date:   2015-08-18 19:00:58
categories: tech post
---
WPF Calendar控件是在2010年加入的。对于Calendar控件有一个问题是当选中其中的一日期后，点击其他元素都需要两次，其原因是Calendar中的CalendarDayButton, CalendarButton会Capture Mouse。
所以解决方案如下：<br/>
override OnPreviewMouseUp 
<br/>
{% highlight csharp linenos %}
protected override void OnPreviewMouseUp(MouseButtonEventArgs e)
{
    base.OnPreviewMouseUp(e);
    if (Mouse.Captured is CalendarItem)
    {
        Mouse.Capture(null);
    }
}
{% endhighlight %}