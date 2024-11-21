---
title: Android蓝牙串口通(附Demo源码下载)
date: 2019/11/06
permalink: /android/53523f.html
categories:
 - android
tags:
 - android

---

> 以下的代码我优化并打包成了一个依赖库，可以非常快捷的实现相关功能，感兴趣的可以支持一下。  
[github](https://github.com/Shanyaliux/SerialPortSample)  
[使用文档](https://serialport.readthedocs.io/)
> 

## **介绍**

这次做项目用到了Android蓝牙串口，折腾了两天总算弄出来了，记录一下方便以后回顾。

## **获取相关权限**

获取蓝牙权限

在 AndroidManifest.xml文件中加入如下代码，（其实这俩句可以先不加，在工程中写到相应语句的时候可以Alt+Enter添加）

```
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

再加上定位权限，这是Android 6.0 以上一定需要注意的地方，同时最好在代码里加上判断是否获取定位权限的代码（就是这个该死的玩意儿耽误我好长时间）

AndroidManifest.xml中

```
    <uses-feature android:name="android.hardware.location.gps" />
    <uses-feature
        android:name="android.hardware.bluetooth_le"
        android:required="true" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

判断是否获取定位权限（这里我是写在了扫描未配对蓝牙设备的地方，当然也可以直接放在程序刚开始）

```java
    if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED){//未开启定位权限
            //开启定位权限,200是标识码
            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION},200);
        }else{
            // 显示其它设备（未配对设备）列表
            findViewById(R.id.textView).setVisibility(View.VISIBLE);

            // 关闭再进行的服务查找
            if (mBluetoothAdapter.isDiscovering()) {
                mBluetoothAdapter.cancelDiscovery();
            }

            mBluetoothAdapter.startDiscovery();
        }
    }
```

上述判断发现未开启之后会自动回调函数区开启，这里手动实现代码如下

```java
@Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode){
            case 200:
                if(grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    doDiscovery();
                }else{
                    finish();
                }
                break;
                default:
        }
    }
```

权限方面的事情完了（我并不是在程序刚开始的地方考虑的，这一点很不好，后续版本会改掉 ，这里就懒得弄了，嘿嘿）

## **判断蓝牙是否打开**

```java
//如果打不开蓝牙提示信息，结束程序
        if (mBluetoothAdapter == null){
            Toast.makeText(getApplicationContext(),"无法打开手机蓝牙，请确认手机是否有蓝牙功能！",Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
```

## **连接按钮的响应**

```java
        final Button connectButton = findViewById(R.id.connectButton);
        connectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (mBluetoothAdapter.isEnabled() == false) {
                    Toast.makeText(getApplicationContext(), " 请先打开蓝牙", Toast.LENGTH_LONG).show();
                    return;
                }

                //如果未连接设备则打开DevicesListActivity搜索设备
                if (mBluetoothSocket == null) {
                    Intent serveIntent = new Intent(getApplicationContext(), DevicesListActivity.class); //跳转活动
                    startActivityForResult(serveIntent, 1); //设置返回宏定义
                } else {
                    //关闭连接socket
                    try {
                        bRun = false;
                        Thread.sleep(2000);

                        is.close();
                        mBluetoothSocket.close();
                        mBluetoothSocket = null;

                        connectButton.setText("连接");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                }
            }
        });
```

## **发送按钮响应**

```java
        Button sendButton = (Button) findViewById(R.id.sendButton);
        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                int n = 0;
                if (mBluetoothSocket == null) {
                    Toast.makeText(getApplicationContext(), "请先连接设备", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (sendEditText.getText().length() == 0) {
                    Toast.makeText(getApplicationContext(), "请先输入数据", Toast.LENGTH_SHORT).show();
                    return;
                }
                try {

                    OutputStream os = mBluetoothSocket.getOutputStream();   //蓝牙连接输出流
                    byte[] bos = sendEditText.getText().toString().getBytes();
                    for (int i = 0; i < bos.length; i++) {
                        if (bos[i] == 0x0a) n++;
                    }
                    byte[] bos_new = new byte[bos.length + n];
                    n = 0;
                    for (int i = 0; i < bos.length; i++) { //手机中换行为0a,将其改为0d 0a后再发送
                        if (bos[i] == 0x0a) {
                            bos_new[n] = 0x0d;
                            n++;
                            bos_new[n] = 0x0a;
                        } else {
                            bos_new[n] = bos[i];
                        }
                        n++;
                    }

                    os.write(bos_new);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
```

## **设备可以被搜索设置**

> 这里就看个人需求了，我是没用上这个
> 

```java
        new Thread(){
            public void run(){
                if(mBluetoothAdapter.isEnabled()==false){
                    mBluetoothAdapter.enable();
                }
            }
        }.start();
```

# **接收活动结果**

> 主要是扫描活动传来的连接信息
> 

```java
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case 1:     //连接结果，由DeviceListActivity设置返回
                // 响应返回结果
                if (resultCode == Activity.RESULT_OK) {   //连接成功，由DeviceListActivity设置返回
                    // MAC地址，由DeviceListActivity设置返回
                    String address = data.getExtras().getString(DevicesListActivity.EXTRA_DEVICE_ADDRESS);
                    // 得到蓝牙设备句柄
                    mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(address);

                    // 用服务号得到socket
                    try {
                        mBluetoothSocket = mBluetoothDevice.createRfcommSocketToServiceRecord(UUID.fromString(MY_UUID));
                    } catch (IOException e) {
                        Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                    }
                    //连接socket
                    Button connectButton = findViewById(R.id.connectButton);
                    try {
                        mBluetoothSocket.connect();
                        Toast.makeText(this, "连接" + mBluetoothDevice.getName() + "成功！", Toast.LENGTH_SHORT).show();
                        connectButton.setText("断开");
                    } catch (IOException e) {
                        try {
                            Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                            mBluetoothSocket.close();
                            mBluetoothSocket = null;
                        } catch (IOException ee) {
                            Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                        }

                        return;
                    }

                    //打开接收线程
                    try {
                        is = mBluetoothSocket.getInputStream();   //得到蓝牙数据输入流
                    } catch (IOException e) {
                        Toast.makeText(this, "接收数据失败！", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    if (bThread == false) {
                        readThread.start();
                        bThread = true;
                    } else {
                        bRun = true;
                    }
                }
                break;
            default:
                break;
        }
    }
```

## **接收线程**

```java
//接收数据线程
    Thread readThread=new Thread(){

        public void run(){
            int num = 0;
            byte[] buffer = new byte[1024];
            byte[] buffer_new = new byte[1024];
            int i = 0;
            int n = 0;
            bRun = true;
            //接收线程
            while(true){
                try{
                    while(is.available()==0){
                        while(bRun == false){}
                    }
                    while(true){
                        if(!bThread)//跳出循环
                            return;

                        num = is.read(buffer);         //读入数据
                        n=0;

                        String s0 = new String(buffer,0,num);
                        for(i=0;i<num;i++){
                            if((buffer[i] == 0x0d)&&(buffer[i+1]==0x0a)){
                                buffer_new[n] = 0x0a;
                                i++;
                            }else{
                                buffer_new[n] = buffer[i];
                            }
                            n++;
                        }
                        String s = new String(buffer_new,0,n);
                        smsg+=s;   //写入接收缓存
                        if(is.available()==0)break;  //短时间没有数据才跳出进行显示
                    }
                    //发送显示消息，进行显示刷新
                    handler.sendMessage(handler.obtainMessage());
                }catch(IOException e){
                }
            }
        }
    };
```

## **消息显示的处理队列**

```java
 	Handler handler= new Handler(){
        public void handleMessage(Message msg){
            super.handleMessage(msg);
            tv_in.setText(smsg);   //显示数据
            scrollView.scrollTo(0,tv_in.getMeasuredHeight()); //跳至数据最后一页
        }
    };
```

## **总结**

至此，接收发送部分已经全部结束，然后就是扫描设备部分了
这部分我直接贴出整个活动的代码了 注释比较齐全就不哔哔了

```java
package com.example.btcontroller;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Set;

public class DevicesListActivity extends AppCompatActivity {

    private static final String TAG = "DevicesListActivity";
    public static String EXTRA_DEVICE_ADDRESS = "设备地址";

    //成员域
    private BluetoothAdapter mBluetoothAdapter; //蓝牙适配器
    private ArrayAdapter<String> mPairedDevicesArrayAdapter; //已配对的设备适配器
    private ArrayAdapter<String> mUnPairedDevicesArrayAdapter; //未配对的设备适配器

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_devices_list);

        //设定默认返回值为取消
        setResult(Activity.RESULT_CANCELED);

        // 初使化设备适配器存储数组
        mPairedDevicesArrayAdapter = new ArrayAdapter<String>(this, R.layout.device_name);
        mUnPairedDevicesArrayAdapter = new ArrayAdapter<String>(this, R.layout.device_name);

        // 设置已配队设备列表
        ListView pairedListView = (ListView) findViewById(R.id.pairedListView);
        pairedListView.setAdapter(mPairedDevicesArrayAdapter);
        pairedListView.setOnItemClickListener( mDeviceClickListener);

        // 设置新查找设备列表
        ListView newDevicesListView = (ListView) findViewById(R.id.unPairedListView);
        newDevicesListView.setAdapter(mUnPairedDevicesArrayAdapter);
        newDevicesListView.setOnItemClickListener(mDeviceClickListener);

        // 注册接收查找到设备action接收器
        this.registerReceiver(mReceiver, new IntentFilter(BluetoothDevice.ACTION_FOUND));

        // 注册查找结束action接收器
        //filter = new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
        this.registerReceiver(mReceiver, new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED));

        this.registerReceiver(mReceiver, new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_STARTED));

        // 得到本地蓝牙句柄
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

        // 得到已配对蓝牙设备列表
        Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();

        //添加已配对设备到列表并显示
        if (pairedDevices.size() > 0) {
            findViewById(R.id.pairedListView).setVisibility(View.VISIBLE);
            for (BluetoothDevice device : pairedDevices) {
                mPairedDevicesArrayAdapter.add(device.getName() + "\n" + device.getAddress());
            }
        } else {
            String noDevices = "没有找到已配对的设备。" ;
            mPairedDevicesArrayAdapter.add(noDevices);
        }

        //取消按键的响应函数
        Button cancelButton = (Button) findViewById(R.id.cancelButton);
        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        // 关闭服务查找
        if (mBluetoothAdapter != null) {
            mBluetoothAdapter.cancelDiscovery();
        }

        // 注销action接收器
        this.unregisterReceiver(mReceiver);
    }

    /**
     * 开始服务和设备查找
     */
    private void doDiscovery() {
//        if (D) Log.d(TAG, "doDiscovery()");

        // 在窗口显示查找中信息
        setTitle("查找设备中...");

        if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED){//未开启定位权限
            //开启定位权限,200是标识码
            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION},200);
        }else{
            // 显示其它设备（未配对设备）列表
            findViewById(R.id.textView).setVisibility(View.VISIBLE);

            // 关闭再进行的服务查找
            if (mBluetoothAdapter.isDiscovering()) {
                mBluetoothAdapter.cancelDiscovery();
            }

            mBluetoothAdapter.startDiscovery();
        }
    }

    //加载菜单
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main,menu);
        return true;
    }

    //菜单项的响应
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()){
            case R.id.scanItem:

                doDiscovery();

                break;
                default:
        }
        return true;
    }

    // 选择设备响应函数
    private AdapterView.OnItemClickListener mDeviceClickListener = new AdapterView.OnItemClickListener() {
        public void onItemClick(AdapterView<?> av, View v, int arg2, long arg3) {
            // 准备连接设备，关闭服务查找
            mBluetoothAdapter.cancelDiscovery();

            // 得到mac地址
            String info = ((TextView) v).getText().toString();
            String address = info.substring(info.length() - 17);

            // 设置返回数据
            Intent intent = new Intent();
            intent.putExtra("设备地址", address);

            // 设置返回值并结束程序
            setResult(Activity.RESULT_OK, intent);
            finish();
        }
    };

    // 查找到设备和搜索完成action监听器
    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        // 查找到设备action
        if (BluetoothDevice.ACTION_FOUND.equals(action)) {
            // 得到蓝牙设备
            BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
            // 如果是已配对的则略过，已得到显示，其余的在添加到列表中进行显示
            if (device.getBondState() != BluetoothDevice.BOND_BONDED) {
                mUnPairedDevicesArrayAdapter.add(device.getName() + "\n" + device.getAddress());
            }else{  //添加到已配对设备列表
                mPairedDevicesArrayAdapter.add(device.getName() + "\n" + device.getAddress());
            }
            // 搜索完成action
        } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
            setTitle("选择要连接的设备");
            if (mUnPairedDevicesArrayAdapter.getCount() == 0) {
                String noDevices = "没有找到新设备";
                mUnPairedDevicesArrayAdapter.add(noDevices);
            }
        }
        }
    };

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode){
            case 200:
                if(grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    doDiscovery();
                }else{
                    finish();
                }
                break;
                default:
        }
    }
}

```

主活动的代码

```
package com.example.btcontroller;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {

    private final static String MY_UUID = "00001101-0000-1000-8000-00805F9B34FB";   //SPP服务UUID号
    private BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter(); //获取蓝牙实例

    private EditText sendEditText; //创建发送 句柄
    private TextView tv_in; //接收显示句柄
    private ScrollView scrollView; //翻页句柄
    private String smsg = ""; //显示用数据缓存

    BluetoothDevice mBluetoothDevice = null; //蓝牙设备
    BluetoothSocket mBluetoothSocket = null; //蓝牙通信Socket

    boolean bRun = true; //运行状态
    boolean bThread = false; //读取线程状态
    private InputStream is;    //输入流，用来接收蓝牙数据

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //获取控件ID
        sendEditText = findViewById(R.id.sendEditText);
        scrollView = findViewById(R.id.receiveScrolView);
        tv_in = findViewById(R.id.in);

        //如果打不开蓝牙提示信息，结束程序
        if (mBluetoothAdapter == null){
            Toast.makeText(getApplicationContext(),"无法打开手机蓝牙，请确认手机是否有蓝牙功能！",Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        //连接按钮响应
        final Button connectButton = findViewById(R.id.connectButton);
        connectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (mBluetoothAdapter.isEnabled() == false) {
                    Toast.makeText(getApplicationContext(), " 请先打开蓝牙", Toast.LENGTH_LONG).show();
                    return;
                }

                //如果未连接设备则打开DevicesListActivity搜索设备
                if (mBluetoothSocket == null) {
                    Intent serveIntent = new Intent(getApplicationContext(), DevicesListActivity.class); //跳转活动
                    startActivityForResult(serveIntent, 1); //设置返回宏定义
                } else {
                    //关闭连接socket
                    try {
                        bRun = false;
                        Thread.sleep(2000);

                        is.close();
                        mBluetoothSocket.close();
                        mBluetoothSocket = null;

                        connectButton.setText("连接");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                }
            }
        });

        //发送按钮响应
        Button sendButton = (Button) findViewById(R.id.sendButton);
        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                int n = 0;
                if (mBluetoothSocket == null) {
                    Toast.makeText(getApplicationContext(), "请先连接设备", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (sendEditText.getText().length() == 0) {
                    Toast.makeText(getApplicationContext(), "请先输入数据", Toast.LENGTH_SHORT).show();
                    return;
                }
                try {

                    OutputStream os = mBluetoothSocket.getOutputStream();   //蓝牙连接输出流
                    byte[] bos = sendEditText.getText().toString().getBytes();
                    for (int i = 0; i < bos.length; i++) {
                        if (bos[i] == 0x0a) n++;
                    }
                    byte[] bos_new = new byte[bos.length + n];
                    n = 0;
                    for (int i = 0; i < bos.length; i++) { //手机中换行为0a,将其改为0d 0a后再发送
                        if (bos[i] == 0x0a) {
                            bos_new[n] = 0x0d;
                            n++;
                            bos_new[n] = 0x0a;
                        } else {
                            bos_new[n] = bos[i];
                        }
                        n++;
                    }

                    os.write(bos_new);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        // 设置设备可以被搜索
        new Thread(){
            public void run(){
                if(mBluetoothAdapter.isEnabled()==false){
                    mBluetoothAdapter.enable();
                }
            }
        }.start();
    }

    //接收活动结果，响应startActivityForResult()
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case 1:     //连接结果，由DeviceListActivity设置返回
                // 响应返回结果
                if (resultCode == Activity.RESULT_OK) {   //连接成功，由DeviceListActivity设置返回
                    // MAC地址，由DeviceListActivity设置返回
                    String address = data.getExtras().getString(DevicesListActivity.EXTRA_DEVICE_ADDRESS);
                    // 得到蓝牙设备句柄
                    mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(address);

                    // 用服务号得到socket
                    try {
                        mBluetoothSocket = mBluetoothDevice.createRfcommSocketToServiceRecord(UUID.fromString(MY_UUID));
                    } catch (IOException e) {
                        Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                    }
                    //连接socket
                    Button connectButton = findViewById(R.id.connectButton);
                    try {
                        mBluetoothSocket.connect();
                        Toast.makeText(this, "连接" + mBluetoothDevice.getName() + "成功！", Toast.LENGTH_SHORT).show();
                        connectButton.setText("断开");
                    } catch (IOException e) {
                        try {
                            Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                            mBluetoothSocket.close();
                            mBluetoothSocket = null;
                        } catch (IOException ee) {
                            Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                        }

                        return;
                    }

                    //打开接收线程
                    try {
                        is = mBluetoothSocket.getInputStream();   //得到蓝牙数据输入流
                    } catch (IOException e) {
                        Toast.makeText(this, "接收数据失败！", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    if (bThread == false) {
                        readThread.start();
                        bThread = true;
                    } else {
                        bRun = true;
                    }
                }
                break;
            default:
                break;
        }
    }

    //接收数据线程
    Thread readThread=new Thread(){

        public void run(){
            int num = 0;
            byte[] buffer = new byte[1024];
            byte[] buffer_new = new byte[1024];
            int i = 0;
            int n = 0;
            bRun = true;
            //接收线程
            while(true){
                try{
                    while(is.available()==0){
                        while(bRun == false){}
                    }
                    while(true){
                        if(!bThread)//跳出循环
                            return;

                        num = is.read(buffer);         //读入数据
                        n=0;

                        String s0 = new String(buffer,0,num);
                        for(i=0;i<num;i++){
                            if((buffer[i] == 0x0d)&&(buffer[i+1]==0x0a)){
                                buffer_new[n] = 0x0a;
                                i++;
                            }else{
                                buffer_new[n] = buffer[i];
                            }
                            n++;
                        }
                        String s = new String(buffer_new,0,n);
                        smsg+=s;   //写入接收缓存
                        if(is.available()==0)break;  //短时间没有数据才跳出进行显示
                    }
                    //发送显示消息，进行显示刷新
                    handler.sendMessage(handler.obtainMessage());
                }catch(IOException e){
                }
            }
        }
    };

    //消息处理队列
    Handler handler= new Handler(){
        public void handleMessage(Message msg){
            super.handleMessage(msg);
            tv_in.setText(smsg);   //显示数据
            scrollView.scrollTo(0,tv_in.getMeasuredHeight()); //跳至数据最后一页
        }
    };

    //关闭程序掉用处理部分
    public void onDestroy(){
        super.onDestroy();
        if(mBluetoothSocket!=null)  //关闭连接socket
            try{
                mBluetoothSocket.close();
            }catch(IOException e){}
        //	_bluetooth.disable();  //关闭蓝牙服务
    }
}

```

## **Demo源码下载**

[CSDN](https://download.csdn.net/download/qq_41121080/11954958)  
[蓝奏云](https://shanya.lanzout.com/iQs7ye3rccd)

::: tip 提示
以下的代码我优化并打包成了一个依赖库，可以非常快捷的实现相关功能，感兴趣的可以支持一下。  
[github](https://github.com/Shanyaliux/SerialPortSample)  
[使用文档](https://serialport.readthedocs.io/)
:::

## **介绍**

这次做项目用到了Android蓝牙串口，折腾了两天总算弄出来了，记录一下方便以后回顾。

## **获取相关权限**

获取蓝牙权限

在 AndroidManifest.xml文件中加入如下代码，（其实这俩句可以先不加，在工程中写到相应语句的时候可以Alt+Enter添加）

```
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

再加上定位权限，这是Android 6.0 以上一定需要注意的地方，同时最好在代码里加上判断是否获取定位权限的代码（就是这个该死的玩意儿耽误我好长时间）

AndroidManifest.xml中

```
    <uses-feature android:name="android.hardware.location.gps" />
    <uses-feature
        android:name="android.hardware.bluetooth_le"
        android:required="true" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

判断是否获取定位权限（这里我是写在了扫描未配对蓝牙设备的地方，当然也可以直接放在程序刚开始）

```
    if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED){//未开启定位权限
            //开启定位权限,200是标识码
            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION},200);
        }else{
            // 显示其它设备（未配对设备）列表
            findViewById(R.id.textView).setVisibility(View.VISIBLE);

            // 关闭再进行的服务查找
            if (mBluetoothAdapter.isDiscovering()) {
                mBluetoothAdapter.cancelDiscovery();
            }

            mBluetoothAdapter.startDiscovery();
        }
    }
```

上述判断发现未开启之后会自动回调函数区开启，这里手动实现代码如下

```
@Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode){
            case 200:
                if(grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    doDiscovery();
                }else{
                    finish();
                }
                break;
                default:
        }
    }
```

权限方面的事情完了（我并不是在程序刚开始的地方考虑的，这一点很不好，后续版本会改掉 ，这里就懒得弄了，嘿嘿）

## **判断蓝牙是否打开**

```
//如果打不开蓝牙提示信息，结束程序
        if (mBluetoothAdapter == null){
            Toast.makeText(getApplicationContext(),"无法打开手机蓝牙，请确认手机是否有蓝牙功能！",Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
```

## **连接按钮的响应**

```
        final Button connectButton = findViewById(R.id.connectButton);
        connectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (mBluetoothAdapter.isEnabled() == false) {
                    Toast.makeText(getApplicationContext(), " 请先打开蓝牙", Toast.LENGTH_LONG).show();
                    return;
                }

                //如果未连接设备则打开DevicesListActivity搜索设备
                if (mBluetoothSocket == null) {
                    Intent serveIntent = new Intent(getApplicationContext(), DevicesListActivity.class); //跳转活动
                    startActivityForResult(serveIntent, 1); //设置返回宏定义
                } else {
                    //关闭连接socket
                    try {
                        bRun = false;
                        Thread.sleep(2000);

                        is.close();
                        mBluetoothSocket.close();
                        mBluetoothSocket = null;

                        connectButton.setText("连接");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                }
            }
        });
```

## **发送按钮响应**

```
        Button sendButton = (Button) findViewById(R.id.sendButton);
        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                int n = 0;
                if (mBluetoothSocket == null) {
                    Toast.makeText(getApplicationContext(), "请先连接设备", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (sendEditText.getText().length() == 0) {
                    Toast.makeText(getApplicationContext(), "请先输入数据", Toast.LENGTH_SHORT).show();
                    return;
                }
                try {

                    OutputStream os = mBluetoothSocket.getOutputStream();   //蓝牙连接输出流
                    byte[] bos = sendEditText.getText().toString().getBytes();
                    for (int i = 0; i < bos.length; i++) {
                        if (bos[i] == 0x0a) n++;
                    }
                    byte[] bos_new = new byte[bos.length + n];
                    n = 0;
                    for (int i = 0; i < bos.length; i++) { //手机中换行为0a,将其改为0d 0a后再发送
                        if (bos[i] == 0x0a) {
                            bos_new[n] = 0x0d;
                            n++;
                            bos_new[n] = 0x0a;
                        } else {
                            bos_new[n] = bos[i];
                        }
                        n++;
                    }

                    os.write(bos_new);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
```

## **设备可以被搜索设置**

> 这里就看个人需求了，我是没用上这个
> 

```
        new Thread(){
            public void run(){
                if(mBluetoothAdapter.isEnabled()==false){
                    mBluetoothAdapter.enable();
                }
            }
        }.start();
```

# **接收活动结果**

> 主要是扫描活动传来的连接信息
> 

```
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case 1:     //连接结果，由DeviceListActivity设置返回
                // 响应返回结果
                if (resultCode == Activity.RESULT_OK) {   //连接成功，由DeviceListActivity设置返回
                    // MAC地址，由DeviceListActivity设置返回
                    String address = data.getExtras().getString(DevicesListActivity.EXTRA_DEVICE_ADDRESS);
                    // 得到蓝牙设备句柄
                    mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(address);

                    // 用服务号得到socket
                    try {
                        mBluetoothSocket = mBluetoothDevice.createRfcommSocketToServiceRecord(UUID.fromString(MY_UUID));
                    } catch (IOException e) {
                        Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                    }
                    //连接socket
                    Button connectButton = findViewById(R.id.connectButton);
                    try {
                        mBluetoothSocket.connect();
                        Toast.makeText(this, "连接" + mBluetoothDevice.getName() + "成功！", Toast.LENGTH_SHORT).show();
                        connectButton.setText("断开");
                    } catch (IOException e) {
                        try {
                            Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                            mBluetoothSocket.close();
                            mBluetoothSocket = null;
                        } catch (IOException ee) {
                            Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                        }

                        return;
                    }

                    //打开接收线程
                    try {
                        is = mBluetoothSocket.getInputStream();   //得到蓝牙数据输入流
                    } catch (IOException e) {
                        Toast.makeText(this, "接收数据失败！", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    if (bThread == false) {
                        readThread.start();
                        bThread = true;
                    } else {
                        bRun = true;
                    }
                }
                break;
            default:
                break;
        }
    }
```

## **接收线程**

```
//接收数据线程
    Thread readThread=new Thread(){

        public void run(){
            int num = 0;
            byte[] buffer = new byte[1024];
            byte[] buffer_new = new byte[1024];
            int i = 0;
            int n = 0;
            bRun = true;
            //接收线程
            while(true){
                try{
                    while(is.available()==0){
                        while(bRun == false){}
                    }
                    while(true){
                        if(!bThread)//跳出循环
                            return;

                        num = is.read(buffer);         //读入数据
                        n=0;

                        String s0 = new String(buffer,0,num);
                        for(i=0;i<num;i++){
                            if((buffer[i] == 0x0d)&&(buffer[i+1]==0x0a)){
                                buffer_new[n] = 0x0a;
                                i++;
                            }else{
                                buffer_new[n] = buffer[i];
                            }
                            n++;
                        }
                        String s = new String(buffer_new,0,n);
                        smsg+=s;   //写入接收缓存
                        if(is.available()==0)break;  //短时间没有数据才跳出进行显示
                    }
                    //发送显示消息，进行显示刷新
                    handler.sendMessage(handler.obtainMessage());
                }catch(IOException e){
                }
            }
        }
    };
```

## **消息显示的处理队列**

```
 	Handler handler= new Handler(){
        public void handleMessage(Message msg){
            super.handleMessage(msg);
            tv_in.setText(smsg);   //显示数据
            scrollView.scrollTo(0,tv_in.getMeasuredHeight()); //跳至数据最后一页
        }
    };
```

## **总结**

至此，接收发送部分已经全部结束，然后就是扫描设备部分了
这部分我直接贴出整个活动的代码了 注释比较齐全就不哔哔了

```
package com.example.btcontroller;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Set;

public class DevicesListActivity extends AppCompatActivity {

    private static final String TAG = "DevicesListActivity";
    public static String EXTRA_DEVICE_ADDRESS = "设备地址";

    //成员域
    private BluetoothAdapter mBluetoothAdapter; //蓝牙适配器
    private ArrayAdapter<String> mPairedDevicesArrayAdapter; //已配对的设备适配器
    private ArrayAdapter<String> mUnPairedDevicesArrayAdapter; //未配对的设备适配器

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_devices_list);

        //设定默认返回值为取消
        setResult(Activity.RESULT_CANCELED);

        // 初使化设备适配器存储数组
        mPairedDevicesArrayAdapter = new ArrayAdapter<String>(this, R.layout.device_name);
        mUnPairedDevicesArrayAdapter = new ArrayAdapter<String>(this, R.layout.device_name);

        // 设置已配队设备列表
        ListView pairedListView = (ListView) findViewById(R.id.pairedListView);
        pairedListView.setAdapter(mPairedDevicesArrayAdapter);
        pairedListView.setOnItemClickListener( mDeviceClickListener);

        // 设置新查找设备列表
        ListView newDevicesListView = (ListView) findViewById(R.id.unPairedListView);
        newDevicesListView.setAdapter(mUnPairedDevicesArrayAdapter);
        newDevicesListView.setOnItemClickListener(mDeviceClickListener);

        // 注册接收查找到设备action接收器
        this.registerReceiver(mReceiver, new IntentFilter(BluetoothDevice.ACTION_FOUND));

        // 注册查找结束action接收器
        //filter = new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
        this.registerReceiver(mReceiver, new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED));

        this.registerReceiver(mReceiver, new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_STARTED));

        // 得到本地蓝牙句柄
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

        // 得到已配对蓝牙设备列表
        Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();

        //添加已配对设备到列表并显示
        if (pairedDevices.size() > 0) {
            findViewById(R.id.pairedListView).setVisibility(View.VISIBLE);
            for (BluetoothDevice device : pairedDevices) {
                mPairedDevicesArrayAdapter.add(device.getName() + "\n" + device.getAddress());
            }
        } else {
            String noDevices = "没有找到已配对的设备。" ;
            mPairedDevicesArrayAdapter.add(noDevices);
        }

        //取消按键的响应函数
        Button cancelButton = (Button) findViewById(R.id.cancelButton);
        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        // 关闭服务查找
        if (mBluetoothAdapter != null) {
            mBluetoothAdapter.cancelDiscovery();
        }

        // 注销action接收器
        this.unregisterReceiver(mReceiver);
    }

    /**
     * 开始服务和设备查找
     */
    private void doDiscovery() {
//        if (D) Log.d(TAG, "doDiscovery()");

        // 在窗口显示查找中信息
        setTitle("查找设备中...");

        if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED){//未开启定位权限
            //开启定位权限,200是标识码
            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION},200);
        }else{
            // 显示其它设备（未配对设备）列表
            findViewById(R.id.textView).setVisibility(View.VISIBLE);

            // 关闭再进行的服务查找
            if (mBluetoothAdapter.isDiscovering()) {
                mBluetoothAdapter.cancelDiscovery();
            }

            mBluetoothAdapter.startDiscovery();
        }
    }

    //加载菜单
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main,menu);
        return true;
    }

    //菜单项的响应
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()){
            case R.id.scanItem:

                doDiscovery();

                break;
                default:
        }
        return true;
    }

    // 选择设备响应函数
    private AdapterView.OnItemClickListener mDeviceClickListener = new AdapterView.OnItemClickListener() {
        public void onItemClick(AdapterView<?> av, View v, int arg2, long arg3) {
            // 准备连接设备，关闭服务查找
            mBluetoothAdapter.cancelDiscovery();

            // 得到mac地址
            String info = ((TextView) v).getText().toString();
            String address = info.substring(info.length() - 17);

            // 设置返回数据
            Intent intent = new Intent();
            intent.putExtra("设备地址", address);

            // 设置返回值并结束程序
            setResult(Activity.RESULT_OK, intent);
            finish();
        }
    };

    // 查找到设备和搜索完成action监听器
    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        // 查找到设备action
        if (BluetoothDevice.ACTION_FOUND.equals(action)) {
            // 得到蓝牙设备
            BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
            // 如果是已配对的则略过，已得到显示，其余的在添加到列表中进行显示
            if (device.getBondState() != BluetoothDevice.BOND_BONDED) {
                mUnPairedDevicesArrayAdapter.add(device.getName() + "\n" + device.getAddress());
            }else{  //添加到已配对设备列表
                mPairedDevicesArrayAdapter.add(device.getName() + "\n" + device.getAddress());
            }
            // 搜索完成action
        } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
            setTitle("选择要连接的设备");
            if (mUnPairedDevicesArrayAdapter.getCount() == 0) {
                String noDevices = "没有找到新设备";
                mUnPairedDevicesArrayAdapter.add(noDevices);
            }
        }
        }
    };

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode){
            case 200:
                if(grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    doDiscovery();
                }else{
                    finish();
                }
                break;
                default:
        }
    }
}

```

主活动的代码

```
package com.example.btcontroller;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {

    private final static String MY_UUID = "00001101-0000-1000-8000-00805F9B34FB";   //SPP服务UUID号
    private BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter(); //获取蓝牙实例

    private EditText sendEditText; //创建发送 句柄
    private TextView tv_in; //接收显示句柄
    private ScrollView scrollView; //翻页句柄
    private String smsg = ""; //显示用数据缓存

    BluetoothDevice mBluetoothDevice = null; //蓝牙设备
    BluetoothSocket mBluetoothSocket = null; //蓝牙通信Socket

    boolean bRun = true; //运行状态
    boolean bThread = false; //读取线程状态
    private InputStream is;    //输入流，用来接收蓝牙数据

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //获取控件ID
        sendEditText = findViewById(R.id.sendEditText);
        scrollView = findViewById(R.id.receiveScrolView);
        tv_in = findViewById(R.id.in);

        //如果打不开蓝牙提示信息，结束程序
        if (mBluetoothAdapter == null){
            Toast.makeText(getApplicationContext(),"无法打开手机蓝牙，请确认手机是否有蓝牙功能！",Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        //连接按钮响应
        final Button connectButton = findViewById(R.id.connectButton);
        connectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (mBluetoothAdapter.isEnabled() == false) {
                    Toast.makeText(getApplicationContext(), " 请先打开蓝牙", Toast.LENGTH_LONG).show();
                    return;
                }

                //如果未连接设备则打开DevicesListActivity搜索设备
                if (mBluetoothSocket == null) {
                    Intent serveIntent = new Intent(getApplicationContext(), DevicesListActivity.class); //跳转活动
                    startActivityForResult(serveIntent, 1); //设置返回宏定义
                } else {
                    //关闭连接socket
                    try {
                        bRun = false;
                        Thread.sleep(2000);

                        is.close();
                        mBluetoothSocket.close();
                        mBluetoothSocket = null;

                        connectButton.setText("连接");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                }
            }
        });

        //发送按钮响应
        Button sendButton = (Button) findViewById(R.id.sendButton);
        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                int n = 0;
                if (mBluetoothSocket == null) {
                    Toast.makeText(getApplicationContext(), "请先连接设备", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (sendEditText.getText().length() == 0) {
                    Toast.makeText(getApplicationContext(), "请先输入数据", Toast.LENGTH_SHORT).show();
                    return;
                }
                try {

                    OutputStream os = mBluetoothSocket.getOutputStream();   //蓝牙连接输出流
                    byte[] bos = sendEditText.getText().toString().getBytes();
                    for (int i = 0; i < bos.length; i++) {
                        if (bos[i] == 0x0a) n++;
                    }
                    byte[] bos_new = new byte[bos.length + n];
                    n = 0;
                    for (int i = 0; i < bos.length; i++) { //手机中换行为0a,将其改为0d 0a后再发送
                        if (bos[i] == 0x0a) {
                            bos_new[n] = 0x0d;
                            n++;
                            bos_new[n] = 0x0a;
                        } else {
                            bos_new[n] = bos[i];
                        }
                        n++;
                    }

                    os.write(bos_new);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        // 设置设备可以被搜索
        new Thread(){
            public void run(){
                if(mBluetoothAdapter.isEnabled()==false){
                    mBluetoothAdapter.enable();
                }
            }
        }.start();
    }

    //接收活动结果，响应startActivityForResult()
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case 1:     //连接结果，由DeviceListActivity设置返回
                // 响应返回结果
                if (resultCode == Activity.RESULT_OK) {   //连接成功，由DeviceListActivity设置返回
                    // MAC地址，由DeviceListActivity设置返回
                    String address = data.getExtras().getString(DevicesListActivity.EXTRA_DEVICE_ADDRESS);
                    // 得到蓝牙设备句柄
                    mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(address);

                    // 用服务号得到socket
                    try {
                        mBluetoothSocket = mBluetoothDevice.createRfcommSocketToServiceRecord(UUID.fromString(MY_UUID));
                    } catch (IOException e) {
                        Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                    }
                    //连接socket
                    Button connectButton = findViewById(R.id.connectButton);
                    try {
                        mBluetoothSocket.connect();
                        Toast.makeText(this, "连接" + mBluetoothDevice.getName() + "成功！", Toast.LENGTH_SHORT).show();
                        connectButton.setText("断开");
                    } catch (IOException e) {
                        try {
                            Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                            mBluetoothSocket.close();
                            mBluetoothSocket = null;
                        } catch (IOException ee) {
                            Toast.makeText(this, "连接失败！", Toast.LENGTH_SHORT).show();
                        }

                        return;
                    }

                    //打开接收线程
                    try {
                        is = mBluetoothSocket.getInputStream();   //得到蓝牙数据输入流
                    } catch (IOException e) {
                        Toast.makeText(this, "接收数据失败！", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    if (bThread == false) {
                        readThread.start();
                        bThread = true;
                    } else {
                        bRun = true;
                    }
                }
                break;
            default:
                break;
        }
    }

    //接收数据线程
    Thread readThread=new Thread(){

        public void run(){
            int num = 0;
            byte[] buffer = new byte[1024];
            byte[] buffer_new = new byte[1024];
            int i = 0;
            int n = 0;
            bRun = true;
            //接收线程
            while(true){
                try{
                    while(is.available()==0){
                        while(bRun == false){}
                    }
                    while(true){
                        if(!bThread)//跳出循环
                            return;

                        num = is.read(buffer);         //读入数据
                        n=0;

                        String s0 = new String(buffer,0,num);
                        for(i=0;i<num;i++){
                            if((buffer[i] == 0x0d)&&(buffer[i+1]==0x0a)){
                                buffer_new[n] = 0x0a;
                                i++;
                            }else{
                                buffer_new[n] = buffer[i];
                            }
                            n++;
                        }
                        String s = new String(buffer_new,0,n);
                        smsg+=s;   //写入接收缓存
                        if(is.available()==0)break;  //短时间没有数据才跳出进行显示
                    }
                    //发送显示消息，进行显示刷新
                    handler.sendMessage(handler.obtainMessage());
                }catch(IOException e){
                }
            }
        }
    };

    //消息处理队列
    Handler handler= new Handler(){
        public void handleMessage(Message msg){
            super.handleMessage(msg);
            tv_in.setText(smsg);   //显示数据
            scrollView.scrollTo(0,tv_in.getMeasuredHeight()); //跳至数据最后一页
        }
    };

    //关闭程序掉用处理部分
    public void onDestroy(){
        super.onDestroy();
        if(mBluetoothSocket!=null)  //关闭连接socket
            try{
                mBluetoothSocket.close();
            }catch(IOException e){}
        //	_bluetooth.disable();  //关闭蓝牙服务
    }
}

```

## **Demo源码下载**

[CSDN](https://download.csdn.net/download/qq_41121080/11954958)  
[蓝奏云](https://shanya.lanzout.com/iQs7ye3rccd)