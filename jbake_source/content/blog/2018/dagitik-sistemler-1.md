title=Dağıtık Sistemler Notları
date=2018-02-18
type=post
tags=distributed systems
status=published
~~~~~~
#Dağıtık Sistemler Notları
##1.	Dağıtık Sistem nedir?

Birbirinden bağımsız ancak bir ağ üzerinden haberleşerek uyumlu bir biçimde tek bir hesaplama birimi gibi çalışan bilgisayarlar topluluğudur.
##2.	Kaynak paylaşımı(resource sharing), çoğaltma(replication), tutarlılık(consistency)?

	•	Kaynak paylaşımı, cpu ram vs. en kabaca performans kazancı.
	•	Çoğaltma, veriyi ya da işlemi ayrı bir makinedeki kopyalarak kolay erişme ve kolay işleme
	•	Tutarlılık, çoğalttığın için bir yerdeki değişikliği kopyasına bildirip değiştirilmesi gerekiyor.
##3.	Dağıtık Sistemlerin Avantajları?

	•	Fiyat/Performans oranı yüksek
	•	Ölçeklenebilir(scalability) ve Bel bağlanabilir(reliability)
	•	Artan büyüme için potansiyeli var
	•	İletişim ve kaynak paylaşımı imkanı
##4.	Dağıtık Sistemlerin Dezavantajları?

	•	Karmaşık ve kontrolü zor bir sistem.
	•	Network gerekli, networksüz olmaz.
	•	Güvenlik ve mahremiyet (fiziksel uzaklık sebebiyle)
	•	Dağıtık sisteme uygun işletim sistemi, uygulama gerekli
##5.	Dağıtıkla ilgili terimler?
**Openness(Açık olmak);** Standartı belli, tanımlı, kullanılabilir. Açık kaynak.
**Scalability(Ölçeklenebilir);** artan veri, kullanıcı vb. özelliklerini karşılayabilecek şekilde gelişebilme yeteneğidir.
**Reliability(Güvenilebilirlik-Bel bağlanabilirlik);**  Verilen sonuçların doğru olması, yanıltmaması.
**Extensibility(Genişletilebilir, eklenebilir);**
##6.	Transparency Distributed sistemlerin terimleri?
Access Transparency; Verinin sunumunda ve nasıl erişileceğindeki farklılıkların gizlenmesi
Location Transparency; Kaynağın lokasyonunu gizlemesi
Migration Transparency; Kaynağın taşındığının gizlenmesi
Relocation Transparency; Kaynak çalışırken taşındığının gizlenmesi
Replication Transparency; Kaynağın replika edildiğinin gizlenmesi
Concurrency Transparency; Kaynağın birden fazla rekabetçi kullanıcı tarafından kullanıldığının gizlenmesi
Failure Transparency; Hatanın ve kurtarmanın gizlenmesi
Persistence Transparency; Yazılım kaynağının memoryde mi diskte mi tutulduğunun gizlenmesi
##7.	Openness
Syntax’ı ve semantikleri protokoller tarafından bilinmesi,(standart)
Faydaları;
	•	Interoperability; karşılıklı iş yapılabilirlik
	•	Portability; Başka  bir sisteme taşınabilirlik
	•	Extensibility; Sisteme yeni fonksiyonlar koyabilme, ekleyebilme. Politikayı mekanizmadan ayırmak extensibility’nin sağladığı bir güzelliktir. 
##8.	Scalability Problems
Ölçeklenebilirliğin 3 boyutu; Kullanıcı sayısı/Kullanılacak veri boyutu, Coğrafik, İdari/Yönetim
##9.	Ölçekleme Problemini ÇözmeTeknikleri
	•	Asynchronous communication(asenkron iletişim); İstemci sunucu aynı anda ayakta. 
	•	Caching and replication; Caching yaparak hız artar böylece Bir kullanıcıya harcanan zaman azalacağından, daha çok kullanıcıya cevap verilebilecek.
	•	Distribution;