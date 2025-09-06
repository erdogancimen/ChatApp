# Mini Chat App

Modern bir gerçek zamanlı chat uygulaması. React ve Node.js ile geliştirilmiştir.

## 🚀 Özellikler

- **Gerçek Zamanlı Mesajlaşma** - Socket.IO ile anlık mesajlaşma
- **Mobil Uyumlu Tasarım** - Responsive ve modern UI
- **Sistem Mesajları** - Kullanıcı giriş/çıkış bildirimleri
- **Otomatik Scroll** - Yeni mesajlar otomatik en alta iner
- **Geçmiş Mesajlar** - Tüm mesajlar Redis'te saklanır
- **Kullanıcı Yönetimi** - Token tabanlı kimlik doğrulama

## 🛠️ Teknolojiler

### Frontend
- React 19
- Socket.IO Client
- CSS Modules
- Chakra UI

### Backend
- Node.js
- Express.js
- Socket.IO
- Redis
- CORS

## 📦 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- Redis Server

### Backend Kurulumu
```bash
cd backend
npm install
npm start
```

### Frontend Kurulumu
```bash
cd client
npm install
npm start
```

## 🚀 Çalıştırma

1. Redis server'ı başlatın
2. Backend'i başlatın (port 3001)
3. Frontend'i başlatın (port 3000)
4. Tarayıcıda `http://localhost:3000` adresine gidin

## 📱 Kullanım

1. Kullanıcı adınızı girin
2. Chat odasına katılın
3. Mesajlarınızı yazın ve gönderin
4. Diğer kullanıcıların mesajlarını görün

## 🔧 Yapılandırma

### Port Ayarları
- Backend: 3001
- Frontend: 3000

### Redis Yapılandırması
Varsayılan olarak localhost:6379 kullanır.

## 📁 Proje Yapısı

```
Mini Chat App/
├── backend/
│   ├── clients/
│   │   └── redis.js
│   ├── lib/
│   │   └── Messages.js
│   ├── index.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── socketApi.js
│   └── package.json
└── README.md
```



Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Mehmet Seven - mehmetseven0@gmail.com
