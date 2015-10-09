---
layout: post
title:  "wpf data drive & winform event drive"
date:   2015-10-09 8:41:40
categories: tech post
---
《Unix编程艺术》Eric S. Raymond 提到<br/>
数据比程序逻辑更易驾驭。尽可能把设计的复杂度从代码转移至数据是个好实践。<br/>
数据驱动是一种编程范式，程序的展现描述了与之匹配处理的数据。WPF使用数据驱动使得程序员能将重点转移到数据上了（WPF中的数据绑定和INotifyPropertyChanged接口使得数据驱动变得简单易行），而不是程序的逻辑控制。<br/>
对于面向对象编程来说，其三大特性：封装，继承，多态。我个人认为面向对象编程的核心思想是抽象， 封装来源于抽象，当我们把事物抽象的好，那么数据驱动就能发挥出很强大的优势(Demo如下， 三种不同职业人群，但都继承于Person，各自的UI展现不一样。设定好模板后，数据会自己去找对应的UI）。<br/>
事件驱动同样也是一种编程范式，其使用的是“事件-订阅-事件处理器”构建程序。在图形用户界面和Web程序中，事件驱动占主导地位。但其有以下一些缺点：<br/>
1. 事件与UI难以解耦<br/>
2. 代码变得复杂难懂，Bug难以排除<br/>
对于两种不同的编程范式，要根据不同程序性质来取舍。
<h4>Demo:</h4>
MainWindow.xaml
{% highlight xml linenos %}
<Window x:Class="WpfApplication1.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="clr-namespace:WpfApplication1"
        Title="MainWindow" Height="350" Width="525">
    <Window.Resources>
        <DataTemplate DataType="{x:Type local:Student}">
            <StackPanel Background="Blue" Margin="3">
                <TextBlock Text="--Student--"/>
                <TextBlock Text="{Binding Name}"/>
                <TextBlock Text="{Binding Gender}"/>
                <TextBlock Text="{Binding Age}"/>
                <TextBlock Text="{Binding Grade}"/>
                <TextBlock Text="{Binding School}"/>
            </StackPanel>
        </DataTemplate>
 
        <DataTemplate DataType="{x:Type local:Teacher}">
            <StackPanel Background="Yellow" Margin="3">
                <TextBlock Text="--Teacher--"/>
                <TextBlock Text="{Binding Name}"/>
                <TextBlock Text="{Binding Gender}"/>
                <TextBlock Text="{Binding Age}"/>
                <TextBlock Text="{Binding Telephone}"/>
                <TextBlock Text="{Binding Course}"/>
            </StackPanel>
        </DataTemplate>
 
        <DataTemplate DataType="{x:Type local:Solider}">
            <StackPanel Background="Red" Margin="3">
                <TextBlock Text="--Solider--"/>
                <TextBlock Text="{Binding Name}"/>
                <TextBlock Text="{Binding Gender}"/>
                <TextBlock Text="{Binding Age}"/>
                <TextBlock Text="{Binding Type}"/>
                <TextBlock Text="{Binding Status}"/>
            </StackPanel>
        </DataTemplate>
 
    </Window.Resources>
    <Grid>
        <ListBox ItemsSource="{Binding  People,RelativeSource={RelativeSource AncestorType={x:Type Window},AncestorLevel=1}}">
            <ListBox.ItemTemplate>
                <DataTemplate>
                    <ContentControl Content="{Binding}"/>
                </DataTemplate>
            </ListBox.ItemTemplate>
        </ListBox>
    </Grid>
</Window>
{% endhighlight %}
MainWindow.xaml.cs
{% highlight csharp linenos %}
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
 
namespace WpfApplication1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public ObservableCollection<Person> People { get; set; }
 
        public MainWindow()
        {
            InitializeComponent();
 
            People = new ObservableCollection<Person> 
            {
                new Solider{ Name = "Barry", Gender="Female", Status = "Solider", Age = 23, Type = "Air Force"},
                new Student { Name = "Tom", Age = 18, Gender = "Male", Grade = "Grade one" , School = "zhongshan zhongxue"  },
                new Teacher { Name = "Json", Age =30, Course ="English", Gender= "Male", Telephone="43224324"}
            };
        }
    }
}
{% endhighlight %}
结果是：<a href="{{ site.url }}/assets/WpfApplication1.zip" class="dsq-brlink hvr-underline-from-right"> attachment</a>
<img src="{{ site.url }}/img/wpfdata_winformevent.png" data-src="{{ site.url }}/img/post/2015-10-9-wpf-data-drive-&-winform-event-drive.png" />