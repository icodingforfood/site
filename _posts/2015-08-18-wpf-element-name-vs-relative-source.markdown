---
layout: post
title:  "wpf element name vs relative source"
date:   2015-08-18 19:00:58
categories: tech post
---
在WPF程序开发过程中，我们可能经常会绑定一些属性（可能是ViewModel里的一些属性，也可能是对应的View的CodeBehind的一些属性，还有可能是View里面其他一

些UIElement的属性）， 这些属性可能是DependencyProperty（依赖属性），也有可能是CLR（Common Language Runtime）属性。
对于这些属性的绑定，我们可能会去使用ElementName 或RelativeSource去找到对应的属性。
例如：
<pre><code>
<Window x:Class="ElementNameVSRelativeSource.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:diag="clr-namespace:System.Diagnostics;assembly=WindowsBase"
        Title="MainWindow" Height="350" Width="525"
        x:Name="m_Self">
    <StackPanel>
        <TextBlock Text="{Binding Path=TestString,ElementName=m_Self, diag:PresentationTraceSources.TraceLevel=High}"/>
        <TextBlock Text="{Binding Path=Tom.Name,ElementName=m_Self,  diag:PresentationTraceSources.TraceLevel=High}" />
 
 
        <TextBlock Text="{Binding Path=TestString,RelativeSource={RelativeSource AncestorType={x:Type 

Window},AncestorLevel=1},diag:PresentationTraceSources.TraceLevel=High}"/>
        <TextBlock Text="{Binding Path=Tom.Name, RelativeSource={RelativeSource AncestorType={x:Type 

Window},AncestorLevel=1},diag:PresentationTraceSources.TraceLevel=High}"/>
    </StackPanel>
</Window>
</code></pre>