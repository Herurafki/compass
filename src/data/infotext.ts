const infoText: Record<string, string> = {
    temperature: `Suhu Kompos adalah ukuran tingkat panas udara di dalam ruang kompos yang memengaruhi aktivitas mikroba dan proses pengomposan.

    Suhu kurang dari 25°C adalah Rendah.
    Suhu 25 - 35°C adalah Ideal.
    Suhu lebih dari 35°C adalah Tinggi.`,

    humidity: `Kelembapan Relatif adalah persentase kadar air di udara dalam ruang kompos yang memengaruhi metabolisme mikroba.

    Kelembapan kurang dari 40% adalah Rendah.
    Kelembapan 40 - 60% adalah Ideal.
    Kelembapan lebih dari 60% adalah Tinggi.`,

    gm: `Kadar Gas Metana (CH4) adalah jumlah gas metana dalam ruang kompos yang menandakan kondisi fermentasi anaerob.

    Metana 200 - 400 ppm adalah Normal.
    Metana lebih dari 1500 ppm adalah Sangat Tinggi.`,

    co2: `Kadar Karbon Dioksida (CO2) adalah jumlah CO2 dalam ruang kompos yang mencerminkan aktivitas mikroba dan kondisi ventilasi.

    CO2 sampai dengan 1000 ppm adalah Normal.
    CO2 lebih dari 1000 ppm adalah Tinggi.
    CO2 lebih dari 3000 ppm adalah Sangat Tinggi.`,

    tm: "Time Measurement menunjukkan durasi operasional dalam hari, jam, dan menit.",

    dst: `Jarak Sensor ke Kompos adalah jarak antara sensor dan permukaan tumpukan kompos yang menunjukkan tingkat kepenuhan.

    Jarak kurang dari 10 cm menandakan ruang kompos hampir penuh.
    Jarak 10 cm atau lebih menandakan masih ada ruang kompos.`,
  };
  
  export default infoText;