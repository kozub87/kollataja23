import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full px-6 py-4 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-display text-3xl tracking-wide">XHP</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#problem" className="hover:text-foreground transition-colors">Wyzwania</a>
            <a href="#rozwiazanie" className="hover:text-foreground transition-colors">O nas</a>
            <a href="#uslugi" className="hover:text-foreground transition-colors">Kompetencje</a>
            <a href="#proces" className="hover:text-foreground transition-colors">Proces</a>
          </div>
          <a href="#kontakt">
            <Button variant="outline" size="sm" className="hidden md:inline-flex border-border text-foreground hover:bg-white hover:text-black transition-colors rounded-sm">
              Rozmowa strategiczna
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 mesh-gradient animate-[spin_30s_linear_infinite]" style={{ width: '200%', height: '200%', top: '-50%', left: '-50%' }}></div>
          <div className="noise-overlay"></div>
        </div>

        <div className="container relative z-10 max-w-5xl">
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] tracking-tight mb-8 stagger-enter">
            Zabezpiecz wizerunek i osiągaj cele biznesowe, <br />
            <span className="italic text-accent">wykorzystując siłę</span> przemyślanej komunikacji.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 stagger-enter delay-100">
            Butikowa agencja doradcza dla liderów biznesu. Łączymy świat mediów, społeczeństwa i administracji, by wspierać Cię na rynkach Polski i Europy Środkowo-Wschodniej (CEE).
          </p>
          <div className="stagger-enter delay-200">
            <a href="#kontakt">
              <Button size="lg" className="bg-foreground text-background hover:bg-transparent hover:text-foreground border border-foreground rounded-sm text-base h-14 px-8">
                Zarezerwuj Darmową Konsultację
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 md:py-32 bg-secondary">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1]">
                Wisieć na włosku, <br />czy <span className="italic text-accent">zarządzać</span> narracją?
              </h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>W dobie natychmiastowego przepływu informacji, jeden nieprzemyślany komunikat, medialny atak lub zmiana w prawie mogą zachwiać latami budowaną reputacją.</p>
              <p>Większość firm reaguje dopiero po fakcie, tracąc zaufanie klientów i partnerów biznesowych.</p>
              <div className="border-l-2 border-accent pl-6 mt-8">
                <p className="font-display italic text-foreground text-2xl tracking-wide m-0">
                  Czy wiesz, co powiesz rynkowi, gdy jutro rano wybuchnie kryzys?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="rozwiazanie" className="py-24 md:py-32">
        <div className="container max-w-7xl">
          <div className="max-w-3xl mb-16">
            <span className="block text-sm uppercase tracking-widest text-accent mb-4 font-medium">Nasza Przewaga</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] mb-6">
              Agencja butikowa, kompetencje na poziomie <span className="text-accent">C-Level</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              W przeciwieństwie do masowych agencji, w XHP pracujesz bezpośrednio z ekspertami. Nasz zespół to byli menedżerowie, dziennikarze i doradcy z sektora publicznego. Nie uczymy się na Twoim biznesie – przychodzimy z gotowym zrozumieniem rynku.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-secondary border-border hover:border-accent/30 transition-colors rounded-sm">
              <CardHeader>
                <div className="font-display text-5xl text-accent/50 mb-4">01</div>
                <CardTitle className="text-2xl font-display font-normal">Strategia zamiast chaosu</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Zyskujesz spójny plan działania, który bezpośrednio wspiera Twoje cele sprzedażowe i biznesowe.
              </CardContent>
            </Card>

            <Card className="bg-secondary border-border hover:border-accent/30 transition-colors rounded-sm">
              <CardHeader>
                <div className="font-display text-5xl text-accent/50 mb-4">02</div>
                <CardTitle className="text-2xl font-display font-normal">Ochrona przed kryzysami</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Niwelujemy ryzyka wizerunkowe, zanim przerodzą się w medialne pożary i uderzą w kurs akcji.
              </CardContent>
            </Card>

            <Card className="bg-secondary border-border hover:border-accent/30 transition-colors rounded-sm">
              <CardHeader>
                <div className="font-display text-5xl text-accent/50 mb-4">03</div>
                <CardTitle className="text-2xl font-display font-normal">Pewność przed kamerą</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Precyzyjnie przygotujemy Twój zarząd do wystąpień, dzięki którym rynek usłyszy dokładnie to, co chcesz przekazać.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="uslugi" className="py-24 md:py-32 bg-secondary">
        <div className="container max-w-7xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] mb-16">
            Jak zbudujemy Twoją <span className="italic">przewagę</span> rynkową?
          </h2>

          <div className="border-t border-border">
            {/* Row 1 */}
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 py-10 border-b border-border hover:bg-white/5 transition-colors group">
              <div>
                <h3 className="text-2xl font-display">Public Relations</h3>
              </div>
              <div>
                <p className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">Pokażemy rynkowi Twoją najlepszą stronę. Zbudujemy trwałe relacje z kluczowymi mediami i liderami opinii, aby Twoja marka kojarzyła się z eksperckością i zaufaniem.</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 py-10 border-b border-border hover:bg-white/5 transition-colors group">
              <div>
                <h3 className="text-2xl font-display">Business Consulting</h3>
              </div>
              <div>
                <p className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">Wykorzystamy komunikację jako dźwignię wzrostu. Pomożemy Ci zarządzać zmianą w organizacji i rozwijać strategiczne relacje B2B na kluczowych rynkach.</p>
              </div>
            </div>

            {/* Row 3 - Highlighted */}
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 py-10 border-b border-border bg-gradient-to-r from-accent/5 to-transparent hover:from-accent/10 transition-colors">
              <div>
                <h3 className="text-2xl font-display flex items-center gap-3">
                  Zarządzanie Kryzysowe
                  <span className="text-[10px] uppercase font-body font-bold bg-accent text-background px-2 py-0.5 rounded tracking-wider">24/7</span>
                </h3>
              </div>
              <div>
                <p className="text-lg text-foreground mb-4">Opanujemy chaos w kluczowym momencie. Zapewniamy natychmiastowe wsparcie, monitoring sytuacji i precyzyjne komunikaty, by chronić wartość Twojej firmy.</p>
                <a href="#kontakt" className="text-accent hover:opacity-80 font-medium inline-block transition-opacity">
                  Potrzebuję pomocy na cito →
                </a>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 py-10 border-b border-border hover:bg-white/5 transition-colors group">
              <div>
                <h3 className="text-2xl font-display">Szkolenia Medialne</h3>
              </div>
              <div>
                <p className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">Przestaniesz bać się trudnych pytań. Nauczymy Cię, jak naturalnie i autorytatywnie prezentować się przed kamerami i na najważniejszych konferencjach rynkowych.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="pt-8 md:pt-0">
              <div className="font-display text-5xl md:text-6xl mb-2">CEE</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground">Polska i kraje regionu</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="font-display text-5xl md:text-6xl mb-2">24/7</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground">Gotowość kryzysowa</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="font-display text-5xl md:text-6xl mb-2">C-Level</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground">Doświadczenie zespołu</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-display text-xl text-foreground">XHP</div>
          <div>&copy; 2026 XHP. Wszelkie prawa zastrzeżone.</div>
        </div>
      </footer>
    </div>
  )
}

export default App
