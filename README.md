# alipay
前段时间自己的网站涉及到支付功能（自己网站后台是node.js开发的），在阅读了官方文档之后，打算在git上找一下开源的支付接口，没想到一个都不能使用，最后无赖自己根据官网资料，自己写了这个接口，原理比较简单，其实没有那么复杂，希望对初学者有帮助，如果有错误还望指出（本接口暂时只在电脑端使用）。
***
# 官网api详细说明
*官方api：https://open.alipay.com*
遇到一些同学说，官方文档阅读起来比较难懂，这里我对几个常见的问题做一些解释：
```
Q.RSA2加密和RSA2数字签名？
A.在开发的同学注意，我这里使用的是RSA2加密算法。RSA是目前最有影响力和最常用的公钥加密算法，它能够抵抗到目前为止已知的绝大多数密码攻击；签名是保证了每次提交的数据都是唯一性，这里的签名是是由每次用户提交的数据和时间等参数按特定格式组成一组字符串，然后通过MD5加密得到的数字签名。

Q.沙箱操作是什么？
A.如果没有沙箱，那么开发者需要等我们的项目上线之后，才能做测试，这样显得很麻烦。支付宝为了让开发者不用等到整个上线就能调试，使用了沙箱工具，它实际上模拟了我们项目上线之后的支付。其中网关和APPID都需要换成沙箱的网关和APPID，其他的不变。
```
# 加载库文件
```
 nmp install 
```
****
# 替换私钥和公钥文件
- 打开lib文件夹下的pem文件夹
- 替换里面的rsa_private_key.pem和rsa_public_key.pem两个文件
（rsa_private_key.pem和rsa_public_key.pem文件内容分别以-----BEGIN RSA PRIVATE（PUBLIC） KEY-----开头和-----END RSA PRIVATE（PUBLIC） KEY-----结尾,格式参考api中的例子）

# 配置说明(使用接口需要你修改这些参数)

```
 var ali = new Alipay({
        /*沙箱中的APPID，等产品正式上线，使用你的应用的APPID*/
        appId:"xxxxxx",
        
        /*买家付款成功后,会跳到 return_url,这个页面可以展示给客户看,没有上线可以不设置*/
        returnUrl:"http(s)://xxx.xxx.xx/xx.html(php/jsp等等页面)",
        
        /*服务器后台通知,这个页面是支付宝服务器端自动调用这个页面的链接地址,这个页面根据支付宝反馈过来的信息修改网站的定单状态,更新完成后需要返回一个success给支付宝.,不能含有任何其它的字符包括html语言,没有上线可以不设置*/
        notifyUrl:"http(s)://xxx.xxx.xx/xx.html(php/jsp等等页面)",
        
        /*RSA2私钥,必须*/
        rsaPrivate:path.resolve('./lib/pem/rsa_private_key.pem'),
        
        /*RSA2公钥，必须*/
        rsaPublic:path.resolve('./lib/pem/rsa_public_key.pem'),
        
        /*如果是沙箱测试，true，否则为false*/
        sandbox:true,
        
        /*加密类型RSA2，这里暂定为RSA2加密*/
        signType:"RSA2"
});
 ```
 ***
 
 # 打开浏览器进行本地测试
 成功！


