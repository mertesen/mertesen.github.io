title=Distributed Sistem Mimarileri - 2
date=2018-02-19
type=post
tags=distributed systems
status=published
~~~~~~

#Distributed Sistem Mimarileri - 2
##System Architectures(Sistem mimarileri)

**1.	Centralized(Merkezi olan)**
Client – Server mimarisinde; en çok kullanılan stil. Request x Respond.
Multitiered Architectures(Çok katmanlı mimariler); en basit organizasyon sadece iki tip makinenin olduğudur. 1.client 2. Server. Her şeyi server yaparken, client adeta dumb bir terminal, grafiksel bir interfacedir. Bu 2 tier yani iki katmanlı mimaridir. Seçimler spektrumunu çiz.
3 tiers yani 3 katman olursa aradaki server “client-server” mimarisinde olur. Çünkü kendisine istek atılırken kendisi de başka bir servera istek atar. 3 tiers: http, j2ee and database.

**2.	Decentralized(Merkezi olmayan**
Distribution(dağıtım);
	**a.** Veritical Distribution(dikey dağıtım);  çoklu katman mimarisi; farklı katmanlar farklı makinelere atanmıştır.
	Mantıksal olarak farklı componentler farklı makinelerin üzerindedir.
	Merkezi olabilir de olmayabilir de.
	**b.** Horizontal Distribution(yatay dağıtım);örn: peer to peer sistemler.
	Merkezi olmazlar.
	Client ya da server fiziksel olarak mantıksal eşparçalara bölünmüş olabilir. Ama her parça kendi veri setinde çalışıyor. Yük dengelemesi sağlıyor bu da.
	**Peer-to-peer Sistemler**; cilent ve server arasındaki ayrımı kaldırır. Her process aynı anda hem client hem de server gibi davranır.
	Overlay network of nodes
	Nodelar kendi adreslerini kullanırlar. Mesajlaşırken Ip kullanmazlar.
	Nodeler istekte bulunanın bilmediği routten gitme isteğinde bulunabilirler. Mantıksal ya da sanal networklerdir. Fiziksel networkun üstüne build edilirler. 
	P2p sistemlerin tipleri; Structered(yapılandırılmış): Chord ve Can sistemleri Unstructered(yapılandırılmamış): node’a yönelik değil, bir yapı yok.
	Chord Sistem: zincir halinde sıralanırlar ve buna göre hashlenirler. Her node’un iki sorumluluğu vardır. Arama ve içerik sağlamak. Burada sorumlu nodelar vardır. Mod aldığında denk gelen node’un ilk büyük sorumlu node’udur.
	Content Addressable Network(CAN) : Orta nokta kayması.Eğer node çıkarsa, düzgün bir eşkenar görünecek şekilde devreder.
	Unstructured p2p systems
	Mesajlar flooding yoluyla iletiliyor.
	Komşular fiziksel yakınlığa göre seçiliyor. Ya da ne zaman overlay networke dahil olduklarına göre seçilir. Superpeers olarak bazı nodelar seçkin node olarak seçiliyorlar. Sorumluluk alabiliyor bu superpeers.

**3.	Hybrid(Birleşik yapılar)**
	a.	Edge – Server Systems; Content Delivery Networks
	b.	Collaborative Distrubuted Systems; Torrent yapısı, trackerlar.
	
**4.	Middleware**
Uygulamalar ve dağıtık platformlar arasındaki form katmanı. 
Amacı dağıtık sistemlerde transparency
İnterceptorler; klasik akışı keserek başka bir koda yönlendirip o iş bittiğinde tekrar kestiği yere geri dönmesini sağlayan yazılım.
Adaptive Software/Computing
Hazır bir sistemin içine adaptive bir component eklenmesi. Yani mesela öyle bir middleware katmanı yazılıyor ki yazılan her hangi bir kodu reliable yapıyor. Çevresel değişime göre kendini adapte eden. Sistemde cpu çok yorulmaya başladı sistemden başka bir cpu ekle, ya da kullanılmıyor cpulardan birini kapat.
Adaptive Computing gerçeklemek için konseptler;
a.	Separation of concerns(Aspect-oriented software/comp)(Endişelerin ayrımı)
Aspect odaklı yani özellik odaklı bir yaklaşım. Örn; test servisleri. Hazır toollar her koda uyabiliyor. Unit testing.
b.	Computational Reflection(self inspection) örn;Garbage collection in java
c.	Component-based design(dynamic component composition)
İhtiyaç anında devreye alınan component mantığı. Just In Time (JIT)
Örn;late binding in programming languages

**5.	Self-managing systems(autonomic systems)**
Kendi kendini yöneten, kontrol eden sistemler. Otonom computing. Sistem çevreyi inceleyip uygun önlemleri alıyor.
