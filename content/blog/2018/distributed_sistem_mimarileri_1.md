title=Distributed Sistem Mimarileri - 1
date=2018-02-19
type=post
tags=distributed systems
status=published
~~~~~~

#Distributed Sistem Mimarileri - 1
##Software Architecture(yazılım mimarisi)

**1.	Layered architecture(katmanlı mimari)**
Her katman altındaki katmanın arayüzünü kullanıyor. Yani aşağıdaki katman server yukarıdaki katman client. OSİ yapısı gibi. Örn;multi-tier web apps

**2.	Object-based Style(obje tabanlı stil)**
Nesneye yönelik programlamada oluşturulan nesneleri farklı makinelere ayırıyoruz. 
Örn; CORBA, javada remote method invocation.

**3.	Shared data-space(data-centered)(paylaşılmış veri alanı)**
Componentler yani bilgisayarlar haberleşmek, birlikte çalışmak için ortak bir paylaşımlı veri alanı kullanıyorlar. Aynı ayna ayakta olmalarına gerek yok. Yani decoupled in time ve space. Bu modelin dezavantajı var. Gönderilen mesajın okunup okunmadığını bilemeyiz. Örn; mail serverları.

**4.	Event-based architecture(Olay tabanlı mimari)**
Publish - subscribe tabalı real time’da kullanılan uygulamalar. 
Event tabanlı bir uygulama. Eğer decoupled in space uygulasaydık shared data-space mimarisini elde ederiz.
Veri anında bir topiğe publish ediliyor ve o topikten subscribe olmuş kişiler bu veriyi görebiliyor.