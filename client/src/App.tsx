import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Link, useLocation } from "wouter";
import { BookOpen, Compass, FileQuestion, Flower2, HeartPulse, Library, Menu, X } from "lucide-react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home, { ArticlesPage, AssessmentsPage, GuidePage, QuestionsPage } from "./pages/Home";
import { useState, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

const navItems = [
  { href: "/", label: "الرئيسية", icon: Compass },
  { href: "/articles", label: "مقالات", icon: BookOpen },
  { href: "/assessments", label: "اختبارات", icon: HeartPulse },
  { href: "/questions", label: "فضاء الأسئلة", icon: FileQuestion },
  { href: "/guide", label: "دليل المساعدة", icon: Library },
];

function Brand() {
  return <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Psy-Hadith الرئيسية">
    <span className="grid size-10 place-items-center rounded-[15px] bg-[#243e3a] text-[#f7f3ec] shadow-[0_8px_20px_rgba(36,62,58,.18)]"><Flower2 className="size-[19px]" strokeWidth={1.7} /></span>
    <span className="leading-none"><span className="display-font block text-[15px] font-extrabold tracking-[-.06em] text-[#243e3a]">Psy-Hadith</span><span className="mt-1 block text-[11px] text-[#78807c]">حديث نفس</span></span>
  </Link>;
}

function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return(
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#f4f1eb]">
    <header className="relative z-20 mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-5 lg:px-10">
      <Brand />
      <nav className="hidden items-center gap-1 rounded-full border border-[#e2ded6] bg-[#fffdf9]/75 p-1 shadow-[0_7px_24px_rgba(36,62,58,.04)] backdrop-blur md:flex" aria-label="التنقل الرئيسي">
        {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all ${location === href ? "bg-[#e7eee8] text-[#243e3a] shadow-sm" : "text-[#78807c] hover:bg-[#f2efe9] hover:text-[#243e3a]"}`}><Icon className="size-4" strokeWidth={1.8} />{label}</Link>)}
      </nav>
      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-2 rounded-full border border-[#e2ded6] bg-[#fffdf9] px-4 py-2 text-[12px] font-medium text-[#33534c] shadow-sm sm:flex"><span className="size-2 rounded-full bg-[#e28e6e]" /> مساحة آمنة</span>
        <button type="button" className="grid size-10 place-items-center rounded-full border border-[#e2ded6] bg-[#fffdf9] text-[#33534c] md:hidden" aria-label="فتح القائمة" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}</button>
      </div>
    </header>
  
    {mobileOpen && <div className="fixed inset-0 z-30 bg-[#243e3a]/15 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)}>
      <div className="absolute left-4 right-4 top-[78px] rounded-[24px] border border-[#e4e1d9] bg-[#fffdf9] p-3 shadow-[0_22px_60px_rgba(36,62,58,.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between border-b border-[#ede9e2] px-3 pb-3"><span className="text-xs text-[#78807c]">التنقل</span><span className="text-xs text-[#b3b5ad]">Psy-Hadith</span></div>
        {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm ${location === href ? "bg-[#e7eee8] font-semibold text-[#243e3a]" : "text-[#78807c]"}`}><Icon className="size-[17px]" />{label}</Link>)}
      </div>
    </div>}
    <main>{children}</main>
    <footer className="mx-auto mt-24 flex max-w-[1400px] flex-col gap-3 border-t border-[#e4e1d9] px-5 py-7 text-xs text-[#8a908c] sm:flex-row sm:items-center sm:justify-between lg:px-10"><span>Psy-Hadith · حديث نفس</span><span>واجهة أولية — المحتوى قيد البناء</span></footer>
    </div>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/articles"} component={ArticlesPage} />
      <Route path={"/assessments"} component={AssessmentsPage} />
      <Route path={"/questions"} component={QuestionsPage} />
      <Route path={"/guide"} component={GuidePage} />
      <Route component={Home} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <AppShell><Router /></AppShell>
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
