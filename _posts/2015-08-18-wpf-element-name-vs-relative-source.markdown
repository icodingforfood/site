---
layout: post
title:  "wpf 元素名称 vs 相对资源"
date:   2015-08-18 19:00:58
categories: tech post
tags: ['tech', 'wpf']
author: "hao2blog"
---
在WPF程序开发过程中，我们可能经常会绑定一些属性（既可能是ViewModel里的一些属性，也可能是对应的View的CodeBehind的一些属性，还有可能是View里面其他一些UIElement的属性），这些属性可能是DependencyProperty（依赖属性），也有可能是CLR（Common Language Runtime）属性。
<br/>
对于这些属性的绑定，我们可能会去使用ElementName 或RelativeSource去找到对应的属性。
<br/>
例如：
MainWindow.xaml
{% highlight xml linenos %}
<Window x:Class="ElementNameVSRelativeSource.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:diag="clr-namespace:System.Diagnostics;assembly=WindowsBase"
        Title="MainWindow" Height="350" Width="525"
        x:Name="m_Self">
    <StackPanel>
        <TextBlock Text="{Binding Path=TestString,ElementName=m_Self, diag:PresentationTraceSources.TraceLevel=High}"/>
        <TextBlock Text="{Binding Path=Tom.Name,ElementName=m_Self,  diag:PresentationTraceSources.TraceLevel=High}"/>
        <TextBlock Text="{Binding Path=TestString,RelativeSource={RelativeSource AncestorType={x:Type Window},AncestorLevel=1},diag:PresentationTraceSources.TraceLevel=High}"/>
        <TextBlock Text="{Binding Path=Tom.Name, RelativeSource={RelativeSource AncestorType={x:Type Window},AncestorLevel=1},diag:PresentationTraceSources.TraceLevel=High}"/>
    </StackPanel>
</Window>
{% endhighlight %}
MainWindow.xmal.cs
{% highlight csharp linenos %}
using System;
using System.Collections.Generic;
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
 
namespace ElementNameVSRelativeSource
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public Person Tom { get; set; }
        public string TestString { get; set; }
         
        public MainWindow()
        {
            InitializeComponent();
 
            Tom = new Person
            {
                Id= "A432432",
                Name = "Tom",
                Age = 24
            };
 
            TestString = "Hello world!";
        }
    }
 
    public class Person
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Age { get; set; }
    }
}
{% endhighlight %}
运行结果如下：
<br/>
 从上面我们可以看到用ElementName的没有正常显示
 <br/>
 但是如果我们把CodedBehind的赋值语句放在InitializeComponent方法之前的话，ElementName和RelativeSource都是可以的。
 <br/>
 对于第一种情况，我们可以知道ElementName会在Component Initialize之前去查询要绑定的值
 <br/>
 下面调试绑定的输出Log
 {% highlight csharp linenos %}
 Step into: Stepping over non-user code 'ElementNameVSRelativeSource.App.Main'
 Step into: Stepping over non-user code 'ElementNameVSRelativeSource.App.InitializeComponent'
 System.Windows.Data Warning: 56 : Created BindingExpression (hash=13742435) for Binding (hash=28312865)
 System.Windows.Data Warning: 58 :   Path: 'TestString'
 System.Windows.Data Warning: 60 : BindingExpression (hash=13742435): Default mode resolved to OneWay
 System.Windows.Data Warning: 61 : BindingExpression (hash=13742435): Default update trigger resolved to PropertyChanged
 System.Windows.Data Warning: 62 : BindingExpression (hash=13742435): Attach to System.Windows.Controls.TextBlock.Text (hash=62636540)
 System.Windows.Data Warning: 67 : BindingExpression (hash=13742435): Resolving source 
 System.Windows.Data Warning: 70 : BindingExpression (hash=13742435): Found data context element: <null> (OK)
 System.Windows.Data Warning: 74 :     Lookup name m_Self:  queried TextBlock (hash=62636540)
 System.Windows.Data Warning: 78 : BindingExpression (hash=13742435): Activate with root item MainWindow (hash=17961330)
 System.Windows.Data Warning: 108 : BindingExpression (hash=13742435):   At level 0 - for MainWindow.TestString found accessor RuntimePropertyInfo(TestString)
 System.Windows.Data Warning: 104 : BindingExpression (hash=13742435): Replace item at level 0 with MainWindow (hash=17961330), using accessor RuntimePropertyInfo(TestString)
 System.Windows.Data Warning: 101 : BindingExpression (hash=13742435): GetValue at level 0 from MainWindow (hash=17961330) using RuntimePropertyInfo(TestString): <null>
 System.Windows.Data Warning: 80 : BindingExpression (hash=13742435): TransferValue - got raw value <null>
 System.Windows.Data Warning: 89 : BindingExpression (hash=13742435): TransferValue - using final value <null>
 'ElementNameVSRelativeSource.vshost.exe' (CLR v4.0.30319: ElementNameVSRelativeSource.vshost.exe): Loaded 'C:\Windows\Microsoft.Net\assembly\GAC_MSIL\PresentationFramework.Aero2\v4.0_4.0.0.0__31bf3856ad364e35\PresentationFramework.Aero2.dll'. Skipped loading symbols. Module is optimized and the debugger option 'Just My Code' is enabled.
 System.Windows.Data Warning: 56 : Created BindingExpression (hash=27317447) for Binding (hash=12123890)
 System.Windows.Data Warning: 58 :   Path: 'Tom.Name'
 System.Windows.Data Warning: 60 : BindingExpression (hash=27317447): Default mode resolved to OneWay
 System.Windows.Data Warning: 61 : BindingExpression (hash=27317447): Default update trigger resolved to PropertyChanged
 System.Windows.Data Warning: 62 : BindingExpression (hash=27317447): Attach to System.Windows.Controls.TextBlock.Text (hash=46273508)
 System.Windows.Data Warning: 67 : BindingExpression (hash=27317447): Resolving source 
 System.Windows.Data Warning: 70 : BindingExpression (hash=27317447): Found data context element: <null> (OK)
 System.Windows.Data Warning: 74 :     Lookup name m_Self:  queried TextBlock (hash=46273508)
 System.Windows.Data Warning: 78 : BindingExpression (hash=27317447): Activate with root item MainWindow (hash=17961330)
 System.Windows.Data Warning: 108 : BindingExpression (hash=27317447):   At level 0 - for MainWindow.Tom found accessor RuntimePropertyInfo(Tom)
 System.Windows.Data Warning: 104 : BindingExpression (hash=27317447): Replace item at level 0 with MainWindow (hash=17961330), using accessor RuntimePropertyInfo(Tom)
 System.Windows.Data Warning: 101 : BindingExpression (hash=27317447): GetValue at level 0 from MainWindow (hash=17961330) using RuntimePropertyInfo(Tom): <null>
 System.Windows.Data Warning: 106 : BindingExpression (hash=27317447):   Item at level 1 is null - no accessor
 'ElementNameVSRelativeSource.vshost.exe' (CLR v4.0.30319: ElementNameVSRelativeSource.vshost.exe): Loaded 'C:\Windows\Microsoft.Net\assembly\GAC_MSIL\PresentationFramework-SystemXml\v4.0_4.0.0.0__b77a5c561934e089\PresentationFramework-SystemXml.dll'. Cannot find or open the PDB file.
 System.Windows.Data Warning: 80 : BindingExpression (hash=27317447): TransferValue - got raw value {DependencyProperty.UnsetValue}
 System.Windows.Data Warning: 88 : BindingExpression (hash=27317447): TransferValue - using fallback/default value ''
 System.Windows.Data Warning: 89 : BindingExpression (hash=27317447): TransferValue - using final value ''
 System.Windows.Data Warning: 56 : Created BindingExpression (hash=64906717) for Binding (hash=13040701)
 System.Windows.Data Warning: 58 :   Path: 'TestString'
 System.Windows.Data Warning: 60 : BindingExpression (hash=64906717): Default mode resolved to OneWay
 System.Windows.Data Warning: 61 : BindingExpression (hash=64906717): Default update trigger resolved to PropertyChanged
 System.Windows.Data Warning: 62 : BindingExpression (hash=64906717): Attach to System.Windows.Controls.TextBlock.Text (hash=43929715)
 System.Windows.Data Warning: 66 : BindingExpression (hash=64906717): RelativeSource (FindAncestor) requires tree context
 System.Windows.Data Warning: 65 : BindingExpression (hash=64906717): Resolve source deferred
 System.Windows.Data Warning: 56 : Created BindingExpression (hash=63539872) for Binding (hash=26101776)
 System.Windows.Data Warning: 58 :   Path: 'Tom.Name'
 System.Windows.Data Warning: 60 : BindingExpression (hash=63539872): Default mode resolved to OneWay
 System.Windows.Data Warning: 61 : BindingExpression (hash=63539872): Default update trigger resolved to PropertyChanged
 System.Windows.Data Warning: 62 : BindingExpression (hash=63539872): Attach to System.Windows.Controls.TextBlock.Text (hash=54997947)
 System.Windows.Data Warning: 66 : BindingExpression (hash=63539872): RelativeSource (FindAncestor) requires tree context
 System.Windows.Data Warning: 65 : BindingExpression (hash=63539872): Resolve source deferred
 'ElementNameVSRelativeSource.vshost.exe' (CLR v4.0.30319: ElementNameVSRelativeSource.vshost.exe): Loaded 'C:\Windows\Microsoft.Net\assembly\GAC_MSIL\PresentationCore.resources\v4.0_4.0.0.0_zh-Hans_31bf3856ad364e35\PresentationCore.resources.dll'. Module was built without symbols.
 System.Windows.Data Warning: 67 : BindingExpression (hash=64906717): Resolving source 
 System.Windows.Data Warning: 70 : BindingExpression (hash=64906717): Found data context element: <null> (OK)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried StackPanel (hash=11656492)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried ContentPresenter (hash=8154127)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried AdornerDecorator (hash=65883786)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried Border (hash=16880676)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried MainWindow (hash=17961330)
 System.Windows.Data Warning: 72 :   RelativeSource.FindAncestor found MainWindow (hash=17961330)
 System.Windows.Data Warning: 78 : BindingExpression (hash=64906717): Activate with root item MainWindow (hash=17961330)
 System.Windows.Data Warning: 107 : BindingExpression (hash=64906717):   At level 0 using cached accessor for MainWindow.TestString: RuntimePropertyInfo(TestString)
 System.Windows.Data Warning: 104 : BindingExpression (hash=64906717): Replace item at level 0 with MainWindow (hash=17961330), using accessor RuntimePropertyInfo(TestString)
 System.Windows.Data Warning: 101 : BindingExpression (hash=64906717): GetValue at level 0 from MainWindow (hash=17961330) using RuntimePropertyInfo(TestString): 'Hello world!'
 System.Windows.Data Warning: 80 : BindingExpression (hash=64906717): TransferValue - got raw value 'Hello world!'
 System.Windows.Data Warning: 89 : BindingExpression (hash=64906717): TransferValue - using final value 'Hello world!'
 System.Windows.Data Warning: 67 : BindingExpression (hash=63539872): Resolving source 
 System.Windows.Data Warning: 70 : BindingExpression (hash=63539872): Found data context element: <null> (OK)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried StackPanel (hash=11656492)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried ContentPresenter (hash=8154127)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried AdornerDecorator (hash=65883786)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried Border (hash=16880676)
 System.Windows.Data Warning: 73 :     Lookup ancestor of type Window:  queried MainWindow (hash=17961330)
 System.Windows.Data Warning: 72 :   RelativeSource.FindAncestor found MainWindow (hash=17961330)
 System.Windows.Data Warning: 78 : BindingExpression (hash=63539872): Activate with root item MainWindow (hash=17961330)
 System.Windows.Data Warning: 107 : BindingExpression (hash=63539872):   At level 0 using cached accessor for MainWindow.Tom: RuntimePropertyInfo(Tom)
 System.Windows.Data Warning: 104 : BindingExpression (hash=63539872): Replace item at level 0 with MainWindow (hash=17961330), using accessor RuntimePropertyInfo(Tom)
 System.Windows.Data Warning: 101 : BindingExpression (hash=63539872): GetValue at level 0 from MainWindow (hash=17961330) using RuntimePropertyInfo(Tom): Person (hash=21019086)
 System.Windows.Data Warning: 108 : BindingExpression (hash=63539872):   At level 1 - for Person.Name found accessor ReflectPropertyDescriptor(Name)
 System.Windows.Data Warning: 104 : BindingExpression (hash=63539872): Replace item at level 1 with Person (hash=21019086), using accessor ReflectPropertyDescriptor(Name)
 'ElementNameVSRelativeSource.vshost.exe' (CLR v4.0.30319: ElementNameVSRelativeSource.vshost.exe): Loaded 'C:\Windows\Microsoft.Net\assembly\GAC_MSIL\PresentationFramework-SystemData\v4.0_4.0.0.0__b77a5c561934e089\PresentationFramework-SystemData.dll'. Cannot find or open the PDB file.
 'ElementNameVSRelativeSource.vshost.exe' (CLR v4.0.30319: ElementNameVSRelativeSource.vshost.exe): Loaded 'C:\Windows\Microsoft.Net\assembly\GAC_MSIL\System.Numerics\v4.0_4.0.0.0__b77a5c561934e089\System.Numerics.dll'. Skipped loading symbols. Module is optimized and the debugger option 'Just My Code' is enabled.
 'ElementNameVSRelativeSource.vshost.exe' (CLR v4.0.30319: ElementNameVSRelativeSource.vshost.exe): Loaded 'C:\Windows\Microsoft.Net\assembly\GAC_MSIL\PresentationFramework-SystemXmlLinq\v4.0_4.0.0.0__b77a5c561934e089\PresentationFramework-SystemXmlLinq.dll'. Cannot find or open the PDB file.
 System.Windows.Data Warning: 101 : BindingExpression (hash=63539872): GetValue at level 1 from Person (hash=21019086) using ReflectPropertyDescriptor(Name): 'Tom'
 System.Windows.Data Warning: 80 : BindingExpression (hash=63539872): TransferValue - got raw value 'Tom'
 System.Windows.Data Warning: 89 : BindingExpression (hash=63539872): TransferValue - using final value 'Tom'
 'ElementNameVSRelativeSource.vshost.exe' (CLR v4.0.30319: ElementNameVSRelativeSource.vshost.exe): Loaded 'C:\Windows\Microsoft.Net\assembly\GAC_MSIL\UIAutomationTypes\v4.0_4.0.0.0__31bf3856ad364e35\UIAutomationTypes.dll'. Skipped loading symbols. Module is optimized and the debugger option 'Just My Code' is enabled.
 {% endhighlight %}
 出现第一种情况的原因是跟View的初始化顺序有关
 <br/>
 这里我们来看下ElementName和RelativeSource的区别：
 <br/>
 ElementName：它会在程序启动的时候把UIElement的Name加到Namescope中去，然后就去查询对应Name下的属性值，而此时赋值语句还未执行
 <br/>
 RelativeSource：它会在启动的时候设定查询VisualTree上下文，然后解析资源被推迟。当PresentationCore（负责一些WPF基本类型，如UIElement，Visual）加载后就会去迭代查询Ancestors，在找对应的UIElement后就去解析资源。