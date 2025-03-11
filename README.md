# Daftar karakter anime API
Kode ini adalah REST API sederhana menggunakan Node.js dan Express.js untuk mengelola daftar karakter anime. API ini memungkinkan pengguna untuk menampilkan, mencari, menambah, mengupdate, dan menghapus karakter. Selain itu, API ini juga menyediakan fitur statistik terkait karakter anime yang ada dalam database sementara (array characters).

Server berjalan pada port 3000 dan menangani berbagai request HTTP, seperti GET, POST, PUT, dan DELETE. API ini juga dilengkapi dengan error handling dan fitur tambahan seperti sorting, filtering, dan pagination dalam pencarian karakter.

# Fitur Utama
API ini memiliki beberapa fitur utama, yaitu:

### Manajemen Karakter Anime
    GET /characters → Menampilkan semua karakter yang tersedia.
    GET /characters/:id → Mengambil detail karakter berdasarkan ID.
    POST /characters → Menambahkan karakter baru ke daftar.
    PUT /characters/:id → Mengupdate karakter berdasarkan ID.
    DELETE /characters/:id → Menghapus karakter berdasarkan ID.
    POST /characters/bulk → Menambahkan banyak karakter sekaligus.
    DELETE /characters → Menghapus beberapa karakter berdasarkan array ID.
### Pencarian & Filter
    GET /characters/search → Mencari karakter berdasarkan nama, anime, atau kekuatan.
    Fitur tambahan pada pencarian:
    Sorting: (?sort=name:asc atau ?sort=anime:desc)
    Pagination: (?limit=5 untuk membatasi jumlah hasil)
### Statistik Karakter
    GET /stats → Mengembalikan statistik, seperti:
    Total karakter.
    Jumlah anime unik.
    Distribusi karakter berdasarkan anime dan kekuatan.
    Anime yang paling banyak muncul.
### Error Handling & Middleware
    Middleware menangani error global (500 Internal Server Error).
    uncaughtException untuk menangani error tak terduga agar server tetap berjalan.

# Penggunaan API
Berikut adalah beberapa contoh penggunaan API dengan Postman atau cURL.
## Mendapatkan Semua Karakter
### Request
    GET /characters
### Response
    {
      "data": [
        {
          "id": 1,
          "name": "Naruto Uzumaki",
          "anime": "Naruto",
          "power": "Nine-Tails Chakra"
        },
        {
          "id": 2,
          "name": "Monkey D. Luffy",
          "anime": "One Piece",
          "power": "Gum-Gum Devil Fruit"
        }
      ]
    }

## Mencari Karakter dengan Filter
### Request
    GET /characters/search?name=Naruto
### Response 
    {
      "count": 1,
      "data": [
        {
          "id": 1,
          "name": "Naruto Uzumaki",
          "anime": "Naruto",
          "power": "Nine-Tails Chakra"
        }
      ]
    }
## Menambahkan Karakter Baru
### Request 
    POST /characters
    Content-Type: application/json
### Body 
    {
      "name": "Goku",
      "anime": "Dragon Ball",
      "power": "Super Saiyan"
    }

### Response 
    {
      "message": "Character created successfully",
      "data": {
        "id": 3,
        "name": "Goku",
        "anime": "Dragon Ball",
        "power": "Super Saiyan"
      }
    }

## Mengupdate Karakter
### Request
    PUT /characters/3
    Content-Type: application/json
### Body
    {
      "power": "Ultra Instinct"
    }
### Response 
    {
      "message": "Character updated successfully",
      "data": {
        "id": 3,
        "name": "Goku",
        "anime": "Dragon Ball",
        "power": "Ultra Instinct"
      }
    }
## Menghapus Karakter
### Request
      DELETE /characters/3
### Response 
    {
      "message": "Character deleted successfully"
    }

## Mendapatkan Statistik Karakter
### Request
    GET /stats
### Response
    {
      "data": {
        "totalCharacters": 2,
        "animeCount": 2,
        "charactersByAnime": {
          "Naruto": 1,
          "One Piece": 1
        },
        "powerDistribution": {
          "Nine-Tails Chakra": 1,
          "Gum-Gum Devil Fruit": 1
        },
        "mostPopularAnime": "Naruto"
      }
    }
    

# Kesimpulan 
API ini adalah RESTful API sederhana yang bisa digunakan untuk mengelola data karakter anime. Dengan fitur CRUD, pencarian, filtering, sorting, pagination, dan statistik, API ini cukup fleksibel untuk proyek latihan atau sebagai dasar untuk pengembangan lebih lanjut. 🚀

_____________________________________________________________________________________________________________


## Project 3 PPL

## Sistem API Sederhana

Buatlah API sederhana dengan menggunakan express. API dapat memberikan data dan menambahkan data ke dalam sistem database.

## Kriteria Tugas : 

#### Wajib
1. Memiliki minimal 2 method `GET` dan 1 method `POST` 
contoh (only example):

```bash
"GET" /users 
{
    data: [
        {
            name: "ardi",
            age: "16",
        },
        {
            name: "Fajar",
            age: "78",
        }
    ]
}
```

2. Bisa melihat semua daftar item dengan `GET`
3. Bisa melihat 1 item saja dengan `GET`
3. Bisa menambahkan item baru dengan `POST`
4. Untuk datanya memiliki ketentuan seperti berikut :
    - Menggunakan `JSON`
    - Memiliki Tema (seperti Komik, Character dan lain lain)
    - Data memiliki minimal 3 atribut


#### Nilai Plus
Nilai yang didapatkan jika berhasil mengerjakan yang `wajib` adalah 87, untuk mendapatkan nilai tambahan, 

Kalian bebas berekspresi bagaimana pun dengan sistem tersebut, bisa menambahkan fungsi-fungsi baru akan mendapatkan `nilai +`, contoh fungsi-fungsi yang bisa ditambahkan :
- mengupdate item
- menghapus item
- fungsi lainnya yang keren


## Waktu dan Tempat Pengumpulan
Tenggat waktu pengerjaan tugas adalah `h-1` masuk kelas
Tempat pengumpulan di `spreadsheet` kelompok

