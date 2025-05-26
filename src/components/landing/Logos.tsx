
const Logos: React.FC = () => {
    return (
        <section id="logos" className="py-20 px-5 bg-background">
            {/* <h3 className="text-xl font-semibold text-center mb-8">
                Bersama Melangkah Menuju Lingkungan Lebih Bersih
            </h3> */}
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 opacity-80 max-w-7xl mx-auto">
                {/* Ikon Solar Power - energi bersih */}
                <div className="w-20 h-20 flex items-center justify-center" title="Energi Terbarukan">
                    <img src="/icons/renewable-energy.png" alt="Energi Surya" className="w-12 h-12"/>
                </div>
                {/* Ikon Daun - simbol eco atau lingkungan */}
                <div className="w-20 h-20 flex items-center justify-center" title="Pelestarian Alam">
                    <img src="/icons/leaf.png" alt="Daun" className="w-12 h-12"/>
                </div>
                {/* Ikon Daur Ulang */}
                <div className="w-20 h-20 flex items-center justify-center" title="Daur Ulang">
                    <img src="/icons/recycle-symbol.png" alt="Daur Ulang" className="w-12 h-12"/>
                </div>
                {/* Ikon Planet Earth - bumi */}
                <div className="w-20 h-20 flex items-center justify-center" title="Lestarikan Bumi">
                    <img src="/icons/earth.png" alt="Bumi" className="w-12 h-12"/>
                </div>
                {/* Ikon Cinta Alam */}
                <div className="w-20 h-20 flex items-center justify-center" title="Cinta Alam">
                    <img src="/icons/heart.png" alt="Cinta Alam" className="w-12 h-12"/>
                </div>
            </div>
        </section>
    );
};

export default Logos;